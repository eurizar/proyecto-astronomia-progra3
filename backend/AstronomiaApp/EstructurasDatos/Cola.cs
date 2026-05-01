namespace AstronomiaApp.EstructurasDatos;

/// <summary>Cola genérica FIFO. Implementación manual con nodos enlazados. Sin librerías.</summary>
public class Cola<T>
{
    private class Nodo
    {
        public T Valor;
        public Nodo? Siguiente;
        public Nodo(T valor) { Valor = valor; }
    }

    private Nodo? _frente;
    private Nodo? _final;
    private int _tamanio;

    public int Tamanio => _tamanio;
    public bool EstaVacia => _tamanio == 0;

    /// <summary>Agrega elemento al final de la cola. O(1).</summary>
    public void Encolar(T valor)
    {
        var nuevo = new Nodo(valor);
        if (_final == null)
            _frente = _final = nuevo;
        else
        {
            _final.Siguiente = nuevo;
            _final = nuevo;
        }
        _tamanio++;
    }

    /// <summary>Elimina y devuelve el elemento del frente. O(1).</summary>
    public T Desencolar()
    {
        if (_frente == null) throw new InvalidOperationException("Cola vacía.");
        var valor = _frente.Valor;
        _frente = _frente.Siguiente;
        if (_frente == null) _final = null;
        _tamanio--;
        return valor;
    }

    /// <summary>Devuelve el frente sin eliminarlo. O(1).</summary>
    public T Frente()
    {
        if (_frente == null) throw new InvalidOperationException("Cola vacía.");
        return _frente.Valor;
    }

    /// <summary>Devuelve todos los elementos sin modificar la cola. O(n).</summary>
    public IEnumerable<T> ObtenerTodos()
    {
        var actual = _frente;
        while (actual != null)
        {
            yield return actual.Valor;
            actual = actual.Siguiente;
        }
    }

    public void Limpiar()
    {
        _frente = _final = null;
        _tamanio = 0;
    }
}
