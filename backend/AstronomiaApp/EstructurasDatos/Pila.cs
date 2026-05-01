namespace AstronomiaApp.EstructurasDatos;

/// <summary>Pila genérica LIFO. Implementación manual con nodos enlazados. Sin librerías.</summary>
public class Pila<T>
{
    private class Nodo
    {
        public T Valor;
        public Nodo? Siguiente;
        public Nodo(T valor) { Valor = valor; }
    }

    private Nodo? _tope;
    private int _tamanio;

    public int Tamanio => _tamanio;
    public bool EstaVacia => _tamanio == 0;

    /// <summary>Apila un elemento. O(1).</summary>
    public void Apilar(T valor)
    {
        var nuevo = new Nodo(valor) { Siguiente = _tope };
        _tope = nuevo;
        _tamanio++;
    }

    /// <summary>Desapila y devuelve el elemento del tope. O(1).</summary>
    public T Desapilar()
    {
        if (_tope == null) throw new InvalidOperationException("Pila vacía.");
        var valor = _tope.Valor;
        _tope = _tope.Siguiente;
        _tamanio--;
        return valor;
    }

    /// <summary>Devuelve el tope sin eliminarlo. O(1).</summary>
    public T Tope()
    {
        if (_tope == null) throw new InvalidOperationException("Pila vacía.");
        return _tope.Valor;
    }

    /// <summary>Devuelve todos los elementos del tope a la base. O(n).</summary>
    public IEnumerable<T> ObtenerTodos()
    {
        var actual = _tope;
        while (actual != null)
        {
            yield return actual.Valor;
            actual = actual.Siguiente;
        }
    }

    public void Limpiar()
    {
        _tope = null;
        _tamanio = 0;
    }
}
