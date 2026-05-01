using AstronomiaApp.EstructurasDatos;
using Microsoft.AspNetCore.Http;
using System.Text.Json;

namespace AstronomiaApp.Services;

public record EntradaHistorial(string Nombre, string Url);

/// <summary>
/// Servicio scoped que mantiene historial de navegación por sesión
/// usando Pila manual. Máximo 10 entradas.
/// </summary>
public class HistorialService
{
    private const string SessionKey = "historial_pila";
    private const int MaxEntradas = 10;
    private readonly IHttpContextAccessor _http;

    public HistorialService(IHttpContextAccessor http)
    {
        _http = http;
    }

    /// <summary>Apila la página visitada. Evita duplicado consecutivo en el tope.</summary>
    public void Registrar(string nombre, string url)
    {
        var pila = Cargar();
        if (!pila.EstaVacia && pila.Tope().Url == url) return;

        pila.Apilar(new EntradaHistorial(nombre, url));

        // Mantener máximo MaxEntradas: reconstruir pila truncada
        if (pila.Tamanio > MaxEntradas)
        {
            var items = pila.ObtenerTodos().Take(MaxEntradas).Reverse().ToList();
            pila.Limpiar();
            foreach (var item in items) pila.Apilar(item);
        }

        Guardar(pila);
    }

    /// <summary>Devuelve entradas del más reciente al más antiguo.</summary>
    public IEnumerable<EntradaHistorial> ObtenerHistorial() =>
        Cargar().ObtenerTodos();

    // ── Serialización en sesión ──────────────────────────────────────────

    private Pila<EntradaHistorial> Cargar()
    {
        var pila = new Pila<EntradaHistorial>();
        var session = _http.HttpContext?.Session;
        if (session == null) return pila;

        var json = session.GetString(SessionKey);
        if (string.IsNullOrEmpty(json)) return pila;

        var lista = JsonSerializer.Deserialize<List<EntradaHistorial>>(json) ?? new();
        // lista está en orden base→tope; apilar en ese orden para reproducir la pila
        foreach (var item in lista) pila.Apilar(item);
        return pila;
    }

    private void Guardar(Pila<EntradaHistorial> pila)
    {
        var session = _http.HttpContext?.Session;
        if (session == null) return;

        // Guardar del más antiguo al más reciente para reconstruir igual
        var lista = pila.ObtenerTodos().Reverse().ToList();
        session.SetString(SessionKey, JsonSerializer.Serialize(lista));
    }
}
