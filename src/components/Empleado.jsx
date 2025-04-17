import PropTypes from "prop-types";

// El componente 'Empleado' recibe 2 props, 'empleado' y 'despedir'
const Empleado = ({ empleado, despedir }) => {

  return (
    <article className="person">
      <img src={empleado.picture.medium} alt={empleado.name.title} />
      <div>
        <h4>{`${empleado.name.title} ${empleado.name.first} ${empleado.name.last}`}</h4>
        <p>{empleado.email}</p>
        <p>{empleado.phone}</p>
      </div>
      <button type="button" className="delete-btn" onClick={() => despedir(empleado.uuid)}>
        <img src="./src/trash.png" alt="Despedir" />
      </button>
    </article>
  );
};

// Definir las prop que se le tiene que pasar al componente 'Empleado', su tipo y su obligatoriedad
Empleado.propTypes = {
  empleado: PropTypes.object.isRequired,
  despedir: PropTypes.func.isRequired,
};

export default Empleado;