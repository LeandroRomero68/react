<nav className="flex gap-4 mb-6">
  <Link to="/">Inicio</Link>
  <Link to="/cursos">Cursos</Link>
  <Link to="/cursos/nuevo">Crear Curso</Link>

  <Link to="/register">Registrarme</Link>

  {!user && <Link to="/login">Iniciar sesión</Link>}
  {user && <button onClick={logout}>Cerrar sesión</button>}
</nav>