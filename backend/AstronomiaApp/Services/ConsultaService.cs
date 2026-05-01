using AstronomiaApp.Data;
using AstronomiaApp.EstructurasDatos;
using AstronomiaApp.Models;
using Microsoft.EntityFrameworkCore;

namespace AstronomiaApp.Services;

/// <summary>
/// Servicio singleton que registra consultas del usuario en una Cola manual.
/// Desencola y persiste a BD en lotes para no bloquear cada request.
/// </summary>
public class ConsultaService
{
    private readonly Cola<ConsultaLog> _cola = new();
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly ILogger<ConsultaService> _logger;
    private readonly SemaphoreSlim _lock = new(1, 1);
    private const int FlushCada = 5; // flush automático cada N items

    public ConsultaService(IServiceScopeFactory scopeFactory, ILogger<ConsultaService> logger)
    {
        _scopeFactory = scopeFactory;
        _logger = logger;
    }

    /// <summary>Encola una nueva consulta. Si la cola llega a FlushCada, persiste a BD.</summary>
    public void Registrar(string tipo, string? parametros = null, int? resultados = null, int? duracionMs = null)
    {
        var item = new ConsultaLog
        {
            TipoConsulta = tipo,
            Parametros   = parametros,
            ResultadoCount = resultados,
            DuracionMs   = duracionMs,
            Fecha        = DateTime.UtcNow
        };

        _cola.Encolar(item);
        _logger.LogDebug("Consulta encolada: {Tipo} | Cola: {Size}", tipo, _cola.Tamanio);

        if (_cola.Tamanio >= FlushCada)
            _ = FlushAsync();
    }

    /// <summary>Devuelve las consultas actualmente en cola (pendientes de persistir).</summary>
    public IEnumerable<ConsultaLog> ObtenerEnCola() => _cola.ObtenerTodos();

    public int TamanioActual => _cola.Tamanio;

    /// <summary>Desencola todos los items y los guarda en BD.</summary>
    public async Task FlushAsync()
    {
        if (_cola.EstaVacia) return;

        await _lock.WaitAsync();
        try
        {
            var pendientes = new List<ConsultaLog>();
            while (!_cola.EstaVacia)
                pendientes.Add(_cola.Desencolar());

            if (pendientes.Count == 0) return;

            using var scope = _scopeFactory.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<AstronomiaDbContext>();
            db.ConsultasLog.AddRange(pendientes);
            await db.SaveChangesAsync();

            _logger.LogInformation("Flush: {Count} consultas guardadas en BD", pendientes.Count);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error al hacer flush de consultas");
        }
        finally
        {
            _lock.Release();
        }
    }
}
