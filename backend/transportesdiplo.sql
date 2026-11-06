-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-05-2025 a las 23:42:11
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `transportesdiplo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `novedades`
--

CREATE TABLE `novedades` (
  `id` int(11) NOT NULL,
  `titulo` varchar(250) NOT NULL,
  `subtitulo` text NOT NULL,
  `cuerpo` text NOT NULL,
  `img_id` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `novedades`
--

INSERT INTO `novedades` (`id`, `titulo`, `subtitulo`, `cuerpo`, `img_id`) VALUES
(1, 'FMI: el Gobierno se aseguró un desembolso en el corto plazo en plena caída de reservas y suba del riesgo país', 'Este viernes el acuerdo técnico oficializado en las últimas horas podría quedar aprobado por el directorio. El primer envío de dólares para reforzar al Banco Central sería rápido y se esperan hasta USD 12.000 millones', 'Los plazos con el Fondo Monetario parecen llegar a su fin en los próximos días y se espera una reunión del directorio antes del fin de semana que termine con el proceso de más de cuatro meses de negociaciones para un acuerdo nuevo que le otorgue un refuerzo urgente a un Banco Central que en las últimas semanas aceleró su caída de reservas.', NULL),
(3, 'Confirmaron que mañana funcionarán los colectivos en todo el país pese al paro de la CGT', 'Mario Callegari, vocero del gremio del sector, ratificó que los conductores de corta, media y larga distancia no adherirán a la medida de fuerza. Qué pasará con el resto de los transportes públicos', '“Mañana va a haber colectivos normalmente”, aseguró Mario Callegari al ser consultado por Eduardo Feinmann en radio Mitre.\r\n\r\nAl ser consultado sobre los motivos por los cuales su sindicato no se suma a la huelga, Callegari recordó que la UTA se encuentra bajo un proceso de conciliación obligatoria y por ese motivo no tienen margen para parar. “Dentro de la ley todo, fuera de la ley nada”, aseguró.', NULL),
(11, '15', '15', '15', 'o3cefnkd8ohvwg5521c7'),
(12, '16', '16', '16', 't6kknim2c1stxods9o0i');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `usuario` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `password`) VALUES
(1, 'Armando', '81dc9bdb52d04dc20036dbd8313ed055'),
(2, 'Nathalia', '81dc9bdb52d04dc20036dbd8313ed055');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `novedades`
--
ALTER TABLE `novedades`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `novedades`
--
ALTER TABLE `novedades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
