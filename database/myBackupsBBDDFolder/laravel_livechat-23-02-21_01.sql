-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 23-02-2021 a las 20:41:58
-- Versión del servidor: 10.4.16-MariaDB
-- Versión de PHP: 7.3.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `laravel_livechat`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contactos`
--

CREATE TABLE `contactos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `prefix` int(11) NOT NULL,
  `phone` bigint(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `contactos`
--

INSERT INTO `contactos` (`id`, `name`, `prefix`, `phone`, `created_at`, `updated_at`) VALUES
(1, 'Contacto 1', 57, 3138406835, '2021-02-08 00:43:06', '2021-02-08 00:43:06'),
(2, 'Contacto 2', 57, 3138406835, '2021-02-08 00:43:06', '2021-02-08 00:43:06'),
(3, 'Contacto 3', 57, 3138406835, '2021-02-08 00:43:06', '2021-02-08 00:43:06'),
(4, 'Contacto 4', 57, 3138406835, '2021-02-08 00:43:06', '2021-02-08 00:43:06'),
(5, 'Contacto 5', 57, 3138406835, '2021-02-08 00:43:06', '2021-02-08 00:43:06'),
(6, 'Contacto 6', 57, 3138406835, '2021-02-08 00:43:06', '2021-02-08 00:43:06'),
(7, 'Contacto 7', 57, 3138406835, '2021-02-08 00:43:07', '2021-02-08 00:43:07'),
(8, 'Contacto 8', 57, 3138406835, '2021-02-08 00:43:07', '2021-02-08 00:43:07'),
(9, 'Contacto 9', 57, 3138406835, '2021-02-08 00:43:07', '2021-02-08 00:43:07'),
(10, 'Contacto 10', 57, 3138406835, '2021-02-08 00:43:07', '2021-02-08 00:43:07'),
(11, 'prueba: 11', 11, 111111, '2021-02-08 00:46:34', '2021-02-08 00:46:34'),
(12, 'prueba: 12', 12, 121212, '2021-02-08 00:46:36', '2021-02-08 00:46:36'),
(13, 'prueba: 13', 13, 131313, '2021-02-08 00:46:39', '2021-02-08 00:46:39'),
(14, 'prueba: 14', 14, 141414, '2021-02-08 00:51:24', '2021-02-08 00:51:24'),
(15, 'prueba: 15', 15, 151515, '2021-02-08 00:53:21', '2021-02-08 00:53:21'),
(16, 'prueba: 16', 16, 161616, '2021-02-08 12:18:00', '2021-02-08 12:18:00'),
(17, 'prueba: 4', 4, 444, '2021-02-08 14:47:16', '2021-02-08 14:47:16'),
(18, 'prueba: 4', 4, 444, '2021-02-08 14:49:34', '2021-02-08 14:49:34'),
(19, 'prueba: 19', 19, 191919, '2021-02-08 18:28:54', '2021-02-08 18:28:54'),
(20, 'prueba: 20', 20, 202020, '2021-02-08 18:28:58', '2021-02-08 18:28:58'),
(21, 'prueba: veintiuno', 21, 212121, '2021-02-08 18:29:00', '2021-02-08 18:30:05'),
(22, 'prueba: 22', 22, 222222, '2021-02-08 18:29:02', '2021-02-08 18:29:02'),
(23, 'prueba: 23', 23, 232323, '2021-02-08 18:29:38', '2021-02-08 18:29:38'),
(24, 'prueba: 24', 24, 242424, '2021-02-08 18:47:36', '2021-02-08 18:47:36'),
(25, 'prueba: 25', 25, 252525, '2021-02-08 18:47:40', '2021-02-08 18:47:40'),
(26, 'prueba: 26', 26, 262626, '2021-02-08 18:47:43', '2021-02-08 18:47:43'),
(27, 'prueba: 27', 27, 272727, '2021-02-08 18:47:45', '2021-02-08 18:47:45'),
(28, 'prueba: 28', 28, 282828, '2021-02-08 18:47:48', '2021-02-08 18:47:48'),
(29, 'prueba: 29', 29, 292929, '2021-02-08 18:47:51', '2021-02-08 18:47:51'),
(30, 'prueba: 30', 30, 303030, '2021-02-08 18:47:54', '2021-02-08 18:47:54'),
(31, 'prueba: 31', 31, 313131, '2021-02-08 18:48:35', '2021-02-08 18:48:35'),
(32, 'prueba: 32', 32, 323232, '2021-02-08 19:00:09', '2021-02-08 19:00:09'),
(33, 'prueba: 33', 33, 333333, '2021-02-08 19:00:20', '2021-02-08 19:00:20'),
(34, 'prueba: 34444', 34, 343434, '2021-02-08 19:01:27', '2021-02-08 22:34:21'),
(35, 'prueba: 35', 35, 353535, '2021-02-08 19:01:36', '2021-02-08 19:01:36'),
(36, 'prueba: 36', 36, 363636, '2021-02-08 19:01:40', '2021-02-08 19:01:40'),
(37, 'prueba: 37', 37, 373737, '2021-02-08 19:04:25', '2021-02-08 19:04:25'),
(38, 'prueba: 38', 38, 383838, '2021-02-08 19:10:56', '2021-02-08 19:10:56'),
(39, 'prueba: 39', 39, 393939, '2021-02-08 19:10:58', '2021-02-08 19:10:58'),
(40, 'prueba: 40', 40, 404040, '2021-02-08 19:11:01', '2021-02-08 19:11:01'),
(41, 'prueba: 41', 41, 414141, '2021-02-08 19:22:08', '2021-02-08 19:22:08'),
(42, 'prueba: 42', 42, 424242, '2021-02-08 21:04:52', '2021-02-08 21:04:52'),
(43, 'prueba: 43', 43, 434343, '2021-02-08 21:06:46', '2021-02-08 21:06:46'),
(44, 'prueba: 44', 44, 444444, '2021-02-08 21:06:53', '2021-02-08 21:06:53'),
(45, 'prueba: 45', 45, 454545, '2021-02-09 12:32:40', '2021-02-09 12:32:40'),
(46, 'prueba: 46', 46, 464646, '2021-02-09 12:32:43', '2021-02-09 12:32:43'),
(47, 'prueba: 47', 47, 474747, '2021-02-09 12:32:45', '2021-02-09 12:32:45'),
(48, 'prueba: 48', 48, 484848, '2021-02-09 12:32:48', '2021-02-09 12:32:48'),
(49, 'prueba: 49', 49, 494949, '2021-02-09 12:32:51', '2021-02-09 12:32:51'),
(50, 'prueba: 50', 50, 505050, '2021-02-09 12:32:54', '2021-02-09 12:32:54'),
(51, 'prueba: 51', 51, 515151, '2021-02-09 12:32:58', '2021-02-09 12:32:58'),
(52, 'prueba: 52', 52, 525252, '2021-02-09 12:33:01', '2021-02-09 12:33:01'),
(53, 'prueba: 53', 53, 535353, '2021-02-09 12:33:06', '2021-02-09 12:33:06'),
(54, 'prueba: 54', 54, 545454, '2021-02-09 12:33:09', '2021-02-09 12:33:09'),
(55, 'prueba: 55', 55, 555555, '2021-02-11 17:28:19', '2021-02-11 17:28:19'),
(56, 'prueba: 56', 56, 565656, '2021-02-23 03:25:46', '2021-02-23 03:25:46'),
(57, 'Contacto proba estados', 57, 3148405919, '2021-02-23 03:26:05', '2021-02-23 18:54:21'),
(58, 'prueba: 58', 58, 585858, '2021-02-23 17:46:09', '2021-02-23 17:46:09'),
(59, 'prueba: 59', 59, 595959, '2021-02-23 18:53:57', '2021-02-23 18:53:57'),
(60, 'prueba: 60', 60, 606060, '2021-02-23 18:55:13', '2021-02-23 18:55:13');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contactos_estados`
--

CREATE TABLE `contactos_estados` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `contacto_id` bigint(20) UNSIGNED NOT NULL,
  `estado_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `contactos_estados`
--

INSERT INTO `contactos_estados` (`id`, `contacto_id`, `estado_id`, `created_at`, `updated_at`) VALUES
(1, 1, 2, '2021-02-08 00:43:08', '2021-02-08 07:09:40'),
(2, 2, 3, '2021-02-08 00:43:09', '2021-02-08 18:39:24'),
(3, 3, 3, '2021-02-08 00:43:09', '2021-02-08 07:11:33'),
(4, 4, 3, '2021-02-08 00:43:09', '2021-02-08 07:18:00'),
(5, 5, 1, '2021-02-08 00:43:09', '2021-02-08 00:43:09'),
(6, 6, 3, '2021-02-08 00:43:09', '2021-02-08 15:49:30'),
(7, 7, 4, '2021-02-08 00:43:09', '2021-02-08 07:11:01'),
(8, 8, 2, '2021-02-08 00:43:09', '2021-02-08 18:28:34'),
(9, 9, 4, '2021-02-08 00:43:09', '2021-02-08 07:10:55'),
(10, 10, 3, '2021-02-08 00:43:09', '2021-02-09 12:17:26'),
(11, 11, 4, '2021-02-08 00:46:34', '2021-02-08 16:16:54'),
(12, 12, 5, '2021-02-08 00:46:37', '2021-02-08 12:18:36'),
(13, 13, 2, '2021-02-08 00:46:39', '2021-02-08 18:47:04'),
(14, 14, 2, '2021-02-08 00:51:24', '2021-02-08 00:51:53'),
(15, 15, 2, '2021-02-08 00:53:21', '2021-02-08 00:53:38'),
(16, 16, 5, '2021-02-08 12:18:00', '2021-02-08 19:00:02'),
(17, 17, 4, '2021-02-08 14:47:16', '2021-02-08 14:47:20'),
(18, 18, 2, '2021-02-08 14:49:34', '2021-02-08 19:23:40'),
(19, 19, 3, '2021-02-08 18:28:54', '2021-02-23 17:49:16'),
(20, 20, 2, '2021-02-08 18:28:58', '2021-02-08 18:48:28'),
(21, 21, 2, '2021-02-08 18:29:01', '2021-02-08 18:29:48'),
(22, 22, 2, '2021-02-08 18:29:02', '2021-02-08 18:29:06'),
(23, 23, 2, '2021-02-08 18:29:38', '2021-02-08 18:29:44'),
(24, 24, 2, '2021-02-08 18:47:36', '2021-02-08 18:48:25'),
(25, 25, 2, '2021-02-08 18:47:40', '2021-02-08 18:48:22'),
(26, 26, 2, '2021-02-08 18:47:43', '2021-02-08 18:48:18'),
(27, 27, 2, '2021-02-08 18:47:45', '2021-02-08 18:48:14'),
(28, 28, 2, '2021-02-08 18:47:48', '2021-02-08 18:48:06'),
(29, 29, 2, '2021-02-08 18:47:51', '2021-02-08 18:48:10'),
(30, 30, 2, '2021-02-08 18:47:54', '2021-02-08 18:48:01'),
(31, 31, 2, '2021-02-08 18:48:35', '2021-02-08 18:48:38'),
(32, 32, 2, '2021-02-08 19:00:09', '2021-02-08 19:10:16'),
(33, 33, 1, '2021-02-08 19:00:20', '2021-02-08 19:00:20'),
(34, 34, 1, '2021-02-08 19:01:28', '2021-02-08 19:01:28'),
(35, 35, 2, '2021-02-08 19:01:36', '2021-02-08 19:04:29'),
(36, 36, 2, '2021-02-08 19:01:40', '2021-02-08 19:01:44'),
(37, 37, 4, '2021-02-08 19:04:25', '2021-02-08 19:11:43'),
(38, 38, 1, '2021-02-08 19:10:56', '2021-02-08 19:10:56'),
(39, 39, 2, '2021-02-08 19:10:58', '2021-02-08 19:11:05'),
(40, 40, 1, '2021-02-08 19:11:01', '2021-02-08 19:11:01'),
(41, 41, 2, '2021-02-08 19:22:08', '2021-02-08 19:22:14'),
(42, 42, 1, '2021-02-08 21:04:53', '2021-02-08 21:04:53'),
(43, 43, 1, '2021-02-08 21:06:46', '2021-02-08 21:06:46'),
(44, 44, 1, '2021-02-08 21:06:53', '2021-02-08 21:06:53'),
(45, 45, 1, '2021-02-09 12:32:40', '2021-02-09 12:32:40'),
(46, 46, 1, '2021-02-09 12:32:43', '2021-02-09 12:32:43'),
(47, 47, 1, '2021-02-09 12:32:45', '2021-02-09 12:32:45'),
(48, 48, 1, '2021-02-09 12:32:49', '2021-02-09 12:32:49'),
(49, 49, 1, '2021-02-09 12:32:51', '2021-02-09 12:32:51'),
(50, 50, 3, '2021-02-09 12:32:54', '2021-02-23 04:44:24'),
(51, 51, 1, '2021-02-09 12:32:58', '2021-02-09 12:32:58'),
(52, 52, 1, '2021-02-09 12:33:02', '2021-02-09 12:33:02'),
(53, 53, 3, '2021-02-09 12:33:06', '2021-02-23 17:49:22'),
(54, 54, 1, '2021-02-09 12:33:09', '2021-02-09 12:33:09'),
(55, 55, 2, '2021-02-11 17:28:19', '2021-02-11 17:28:24'),
(56, 56, 1, '2021-02-23 03:25:47', '2021-02-23 03:25:47'),
(57, 57, 3, '2021-02-23 03:26:06', '2021-02-23 04:44:33'),
(58, 58, 1, '2021-02-23 17:46:09', '2021-02-23 17:46:09'),
(59, 59, 1, '2021-02-23 18:53:57', '2021-02-23 18:53:57'),
(60, 60, 1, '2021-02-23 18:55:13', '2021-02-23 18:55:13');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `datos`
--

CREATE TABLE `datos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `identificacion` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ciudad` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `estado` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pais` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `direccion` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefono` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipo_cuenta` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `datos`
--

INSERT INTO `datos` (`id`, `nombre`, `identificacion`, `ciudad`, `estado`, `pais`, `direccion`, `telefono`, `tipo_cuenta`, `created_at`, `updated_at`) VALUES
(1, 'Dato 1', 'iqtErWhwld', 'LeNynKP98O', 'YtTjj5SnZN', 'TQkjuHqhsT', '2kecqdZcCZ', 'qP6H8fyVzP', 'C0FE718FQg', '2021-02-08 00:43:05', '2021-02-08 00:43:05'),
(2, 'Dato 222', 'Ezbi28NpEG', 'rZrSvOLYDm', 'xipDiY4PPu', 'Kz5iXxqEes', '2SqnrUVh6J', 'k3oar24aEp', 'pWL6RSZvmn', '2021-02-08 00:43:05', '2021-02-08 19:24:44'),
(3, 'Dato 3', 'qSEUnwxi0U', 'YF02QVnVGf', '2yGRC3KUHs', 'wr5EBJLVcT', 'CIAIom8zri', 'iALOevjlLi', 'ugfhcffr9V', '2021-02-08 00:43:05', '2021-02-08 00:43:05'),
(4, 'Dato 4', 'SJerl7jNGh', 'lmFeW2iK9G', '9Zk2MKx8Km', 'JqwuvXfOwf', 'JNd3UYwZ8c', 'sIzb7Z2NTs', 'kRGTcnOXTv', '2021-02-08 00:43:06', '2021-02-08 00:43:06'),
(5, 'Dato 5', 'tRapKCCI6M', 'vEV2uem6lL', 'F6RBZ3wmG0', 'nWGnUoG5N7', '7ze4E5SlM9', 'pC7Gnbs2aS', 'YmCOwJuCXN', '2021-02-08 00:43:06', '2021-02-08 00:43:06'),
(6, 'Dato 6', 'UBIkpaMEjM', 'lKL6cuFkB2', 'RoMwDySkXC', '6oOpWKK1Ho', 'RMFRUn07Sa', 'zPWWeFMdug', '3zuqdVTAjS', '2021-02-08 00:43:06', '2021-02-08 00:43:06'),
(7, 'Dato 7', 'RS7hmBAf7k', 'bgRV50yJQJ', '28QGmnTsAp', 'r44Y4r1bur', 'T9ma0pXF7e', 'v4BbiLPrBl', 'Bb28IBnHzu', '2021-02-08 00:43:06', '2021-02-08 00:43:06'),
(8, 'Dato 8', 'Fk9I4FO2ui', 'PTRoD8W7HM', '4tGPMrMfFX', '9jwPG4I6lg', 'kHTQhyWfdC', 'xxOnSJYnSY', 'n1RfsOBum7', '2021-02-08 00:43:06', '2021-02-08 00:43:06'),
(9, 'Dato 9', 'jBFXecHMS2', '60YBr6xCrZ', 'If7n5rjnsN', 'NfVOxaARTk', 'MGHbnW34CK', '0r4CaoeR40', '1qRe7Ur9ZE', '2021-02-08 00:43:06', '2021-02-08 00:43:06'),
(10, 'Dato 10', 'ZZK3fJAYwS', 'bFzxsySMsT', 'E9h1y2qpUz', 'K5rLApQDln', '0sXMbz9bGh', 'o8eo1d8brX', 'WPDaZrEbz4', '2021-02-08 00:43:06', '2021-02-08 00:43:06'),
(11, 'prueba: 11', 'prueba: 11', 'prueba: 11', 'prueba: 11', 'prueba: 11', 'prueba: 11', 'prueba: 11', 'prueba: 11', '2021-02-08 07:10:35', '2021-02-08 07:10:35'),
(12, 'prueba: 1222', 'prueba: 12', 'prueba: 12', 'prueba: 12', 'prueba: 12', 'prueba: 12', 'prueba: 12', 'prueba: 12', '2021-02-08 19:24:15', '2021-02-08 19:24:28'),
(13, 'prueba: 13', 'prueba: 13', 'prueba: 13', 'prueba: 13', 'prueba: 13', 'prueba: 13', 'prueba: 13', 'prueba: 13', '2021-02-08 19:24:35', '2021-02-08 19:24:35'),
(14, 'prueba: 14', 'prueba: 14', 'prueba: 14', 'prueba: 14', 'prueba: 14', 'prueba: 14', 'prueba: 14', 'prueba: 14', '2021-02-09 10:45:42', '2021-02-09 10:45:42'),
(15, 'prueba: 15', 'prueba: 15', 'prueba: 15', 'prueba: 15', 'prueba: 15', 'prueba: 15', 'prueba: 15', 'prueba: 15', '2021-02-09 10:45:47', '2021-02-09 10:45:47'),
(16, 'prueba: 16', 'prueba: 16', 'prueba: 16', 'prueba: 16', 'prueba: 16', 'prueba: 16', 'prueba: 16', 'prueba: 16', '2021-02-11 17:28:54', '2021-02-11 17:28:54'),
(17, 'prueba: 5', 'prueba: 5', 'prueba: 5', 'prueba: 5', 'prueba: 5', 'prueba: 5', 'prueba: 5', 'prueba: 5', '2021-02-23 04:47:39', '2021-02-23 04:47:39');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estados`
--

CREATE TABLE `estados` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `clase` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `estados`
--

INSERT INTO `estados` (`id`, `name`, `description`, `clase`) VALUES
(1, 'Prospecto', 'Contacto nuevo', 'list-group-item-success'),
(2, 'Pendiente', 'Contacto asignado a un maestro', 'list-group-item-secondary'),
(3, 'En Consulta', 'Contacto que ha empezado consulta con maestro', 'list-group-item-info'),
(4, 'No Contesta', 'Contacto que se le escribe sin respuesta por su parte', 'list-group-item-warning'),
(5, 'No Sirve', 'Contacto que no sirve el número', 'list-group-item-danger');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estadosf`
--

CREATE TABLE `estadosf` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `clase` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `estadosf`
--

INSERT INTO `estadosf` (`id`, `name`, `description`, `clase`, `created_at`, `updated_at`) VALUES
(1, 'En Borrador', 'Facturación En Borrador', 'list-group-item-secondary', '2021-02-08 00:43:08', '2021-02-08 00:43:08'),
(2, 'En Revision', 'Facturación En Revision', 'list-group-item-info', '2021-02-08 00:43:08', '2021-02-08 00:43:08'),
(3, 'Aprobado', 'Facturación con recibo aprobada', 'list-group-item-success', '2021-02-08 00:43:08', '2021-02-08 00:43:08'),
(4, 'Rechazado', 'Facturación con recibo rechazado', 'list-group-item-danger', '2021-02-08 00:43:08', '2021-02-08 00:43:08');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturaciones`
--

CREATE TABLE `facturaciones` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `contacto_id` bigint(20) UNSIGNED NOT NULL,
  `dolares` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pesos` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `facturaciones`
--

INSERT INTO `facturaciones` (`id`, `user_id`, `contacto_id`, `dolares`, `pesos`, `created_at`, `updated_at`) VALUES
(1, 3, 10, '300', '1000000', '2021-02-08 12:20:57', '2021-02-08 12:20:57'),
(2, 3, 10, '200', '112121', '2021-02-08 14:45:17', '2021-02-08 14:45:17'),
(3, 3, 10, '200', '1200000', '2021-02-08 16:35:56', '2021-02-08 16:35:56'),
(4, 3, 10, '200', '12121121', '2021-02-08 16:38:48', '2021-02-08 16:38:48'),
(6, 2, 6, '2002', '233223333', '2021-02-08 17:58:28', '2021-02-08 17:58:28'),
(7, 3, 14, '155', '357357', '2021-02-08 17:59:06', '2021-02-09 00:23:34'),
(8, 2, 10, '2000', '15220', '2021-02-08 18:19:32', '2021-02-08 18:19:32'),
(9, 2, 10, '2000', '15220', '2021-02-08 18:19:33', '2021-02-08 18:19:33'),
(10, 2, 10, '500', '145214521', '2021-02-08 18:23:10', '2021-02-08 18:23:10'),
(11, 6, 14, '600', '2145221', '2021-02-08 21:00:50', '2021-02-08 21:00:50'),
(12, 9, 11, '200', '2254545', '2021-02-08 21:01:48', '2021-02-08 21:01:48'),
(13, 7, 10, '200', '5', '2021-02-08 21:07:25', '2021-02-08 21:07:25'),
(14, 8, 10, '477', '32544', '2021-02-08 21:27:20', '2021-02-08 21:27:20'),
(15, 10, 21, '1111', '1512121', '2021-02-08 21:30:56', '2021-02-08 21:30:56'),
(16, 10, 11, '411', '411411411', '2021-02-08 22:41:44', '2021-02-08 22:56:56'),
(17, 10, 21, '333', '155511', '2021-02-08 22:57:58', '2021-02-08 23:06:43'),
(18, 3, 6, '777', '41444', '2021-02-09 00:39:48', '2021-02-09 00:39:48'),
(19, 3, 11, '220', '114411414', '2021-02-09 00:45:24', '2021-02-09 00:45:24'),
(20, 3, 27, '012', '12455', '2021-02-09 10:49:00', '2021-02-09 10:49:00'),
(21, 3, 19, '200', '15151515', '2021-02-09 11:44:46', '2021-02-09 11:44:46'),
(22, 3, 6, '350', '5555151511', '2021-02-09 11:45:16', '2021-02-09 11:45:16'),
(23, 3, 10, '111', '300000', '2021-02-09 11:45:59', '2021-02-09 11:45:59'),
(24, 3, 8, '444', '145444', '2021-02-09 11:46:32', '2021-02-09 11:46:32');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturacion_estado`
--

CREATE TABLE `facturacion_estado` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `facturacion_id` bigint(20) UNSIGNED NOT NULL,
  `estadof_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `facturacion_estado`
--

INSERT INTO `facturacion_estado` (`id`, `facturacion_id`, `estadof_id`, `created_at`, `updated_at`) VALUES
(1, 1, 3, '2021-02-08 12:20:58', '2021-02-08 12:20:58'),
(2, 2, 3, '2021-02-08 14:45:17', '2021-02-08 14:45:17'),
(3, 3, 2, '2021-02-08 16:35:56', '2021-02-08 16:35:56'),
(4, 4, 2, '2021-02-08 16:38:48', '2021-02-09 10:48:06'),
(6, 6, 4, '2021-02-08 17:58:28', '2021-02-09 00:23:00'),
(7, 7, 4, '2021-02-08 17:59:06', '2021-02-09 11:46:58'),
(8, 8, 1, '2021-02-08 18:19:32', '2021-02-08 18:19:32'),
(9, 9, 1, '2021-02-08 18:19:33', '2021-02-08 18:19:33'),
(10, 10, 1, '2021-02-08 18:23:10', '2021-02-08 18:23:10'),
(11, 11, 1, '2021-02-08 21:00:50', '2021-02-08 21:00:50'),
(12, 12, 1, '2021-02-08 21:01:48', '2021-02-08 21:01:48'),
(13, 13, 1, '2021-02-08 21:07:25', '2021-02-08 21:07:25'),
(14, 14, 1, '2021-02-08 21:27:21', '2021-02-08 21:27:21'),
(15, 15, 1, '2021-02-08 21:30:56', '2021-02-08 21:30:56'),
(16, 16, 1, '2021-02-08 22:41:45', '2021-02-08 22:41:45'),
(17, 17, 1, '2021-02-08 22:57:59', '2021-02-08 22:57:59'),
(18, 18, 2, '2021-02-09 00:39:49', '2021-02-09 10:46:43'),
(19, 19, 3, '2021-02-09 00:45:24', '2021-02-09 00:45:31'),
(20, 20, 2, '2021-02-09 10:49:00', '2021-02-09 10:49:07'),
(22, 22, 1, '2021-02-09 11:45:16', '2021-02-09 11:45:16'),
(23, 23, 1, '2021-02-09 11:46:00', '2021-02-09 11:46:00'),
(24, 24, 1, '2021-02-09 11:46:32', '2021-02-09 11:46:32');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fotos`
--

CREATE TABLE `fotos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `facturacion_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `fotos`
--

INSERT INTO `fotos` (`id`, `name`, `url`, `facturacion_id`, `created_at`, `updated_at`) VALUES
(1, '[\"\\/uploads\\/img_wdd39mzSEvDhGzM.jpg\"]', '[\"\\/uploads\\/img_wdd39mzSEvDhGzM.jpg\"]', 1, '2021-02-08 12:20:58', '2021-02-08 12:20:58'),
(2, '[\"\\/uploads\\/img_fuWDKUDrNA3x37S.jpg\"]', '[\"\\/uploads\\/img_fuWDKUDrNA3x37S.jpg\"]', 2, '2021-02-08 14:45:17', '2021-02-08 14:45:17'),
(3, '[\"\\/uploads\\/img_r7D7GnijHf0LDyb.jpg\"]', '[\"\\/uploads\\/img_r7D7GnijHf0LDyb.jpg\"]', 3, '2021-02-08 16:35:56', '2021-02-08 16:35:56'),
(4, '[\"\\/uploads\\/img_GRrI63rXyzRhPK7.jpg\"]', '[\"\\/uploads\\/img_GRrI63rXyzRhPK7.jpg\"]', 4, '2021-02-08 16:38:48', '2021-02-08 16:38:48'),
(6, '[\"\\/uploads\\/img_kxymX24mT1wvLYe.jpg\"]', '[\"\\/uploads\\/img_kxymX24mT1wvLYe.jpg\"]', 6, '2021-02-08 17:58:28', '2021-02-08 17:58:28'),
(7, '[\"\\/uploads\\/img_mkkqYSaS91g8JEN.jpg\"]', '[\"\\/uploads\\/img_mkkqYSaS91g8JEN.jpg\"]', 7, '2021-02-08 17:59:06', '2021-02-08 17:59:06'),
(8, '[\"\\/uploads\\/img_iZsHjU031PeP16z.jpg\"]', '[\"\\/uploads\\/img_iZsHjU031PeP16z.jpg\"]', 8, '2021-02-08 18:19:32', '2021-02-08 18:19:32'),
(9, '[\"\\/uploads\\/img_ZF9CVTudavwk5Ly.jpg\"]', '[\"\\/uploads\\/img_ZF9CVTudavwk5Ly.jpg\"]', 9, '2021-02-08 18:19:33', '2021-02-08 18:19:33'),
(10, '[\"\\/uploads\\/img_z7Fq3GXtxP4ZYaG.jpg\"]', '[\"\\/uploads\\/img_z7Fq3GXtxP4ZYaG.jpg\"]', 10, '2021-02-08 18:23:10', '2021-02-08 18:23:10'),
(11, '[\"\\/uploads\\/img_ejqVdUzYyB2QRJp.jpg\"]', '[\"\\/uploads\\/img_ejqVdUzYyB2QRJp.jpg\"]', 11, '2021-02-08 21:00:50', '2021-02-08 21:00:50'),
(12, '[\"\\/uploads\\/img_A9hrY6CsmRhcKkk.jpg\"]', '[\"\\/uploads\\/img_A9hrY6CsmRhcKkk.jpg\"]', 12, '2021-02-08 21:01:48', '2021-02-08 21:01:48'),
(13, '[\"\\/uploads\\/img_MUIT4E1Ynj3AEe1.jpg\"]', '[\"\\/uploads\\/img_MUIT4E1Ynj3AEe1.jpg\"]', 13, '2021-02-08 21:07:25', '2021-02-08 21:07:25'),
(14, '[\"\\/uploads\\/img_7PWVdALiw2zvJr7.jpg\"]', '[\"\\/uploads\\/img_7PWVdALiw2zvJr7.jpg\"]', 14, '2021-02-08 21:27:20', '2021-02-08 21:27:20'),
(15, '[\"\\/uploads\\/img_S09Cr00aoxRrQwH.jpg\"]', '[\"\\/uploads\\/img_S09Cr00aoxRrQwH.jpg\"]', 15, '2021-02-08 21:30:56', '2021-02-08 21:30:56'),
(16, '[\"\\/uploads\\/img_MvB8ipOcHlKtHzk.jpg\"]', '[\"\\/uploads\\/img_MvB8ipOcHlKtHzk.jpg\"]', 16, '2021-02-08 22:41:45', '2021-02-08 22:56:56'),
(17, '[\"\\/uploads\\/img_aVxGpOgHsEuyEHQ.jpg\"]', '[\"\\/uploads\\/img_aVxGpOgHsEuyEHQ.jpg\"]', 17, '2021-02-08 22:57:59', '2021-02-08 22:57:59'),
(18, '[\"\\/uploads\\/img_0HB5FAnt1RAPZyQ.jpg\"]', '[\"\\/uploads\\/img_0HB5FAnt1RAPZyQ.jpg\"]', 18, '2021-02-09 00:39:49', '2021-02-09 00:39:49'),
(19, '[\"\\/uploads\\/img_cjhruIwhb7FaLJj.jpg\"]', '[\"\\/uploads\\/img_cjhruIwhb7FaLJj.jpg\"]', 19, '2021-02-09 00:45:24', '2021-02-09 00:45:24'),
(20, '[\"\\/uploads\\/img_pTTlTEziTzsmHmc.jpg\"]', '[\"\\/uploads\\/img_pTTlTEziTzsmHmc.jpg\"]', 20, '2021-02-09 10:49:00', '2021-02-09 10:49:00'),
(21, '[\"\\/uploads\\/img_bV7ukQiXugJpDFw.jpg\"]', '[\"\\/uploads\\/img_bV7ukQiXugJpDFw.jpg\"]', 21, '2021-02-09 11:44:46', '2021-02-09 11:44:46'),
(22, '[\"\\/uploads\\/img_XeDwLUjSYqYFvz6.jpg\"]', '[\"\\/uploads\\/img_XeDwLUjSYqYFvz6.jpg\"]', 22, '2021-02-09 11:45:16', '2021-02-09 11:45:16'),
(23, '[\"\\/uploads\\/img_TlFPkg4JIN4jZdb.jpg\"]', '[\"\\/uploads\\/img_TlFPkg4JIN4jZdb.jpg\"]', 23, '2021-02-09 11:46:00', '2021-02-09 11:46:00'),
(24, '[\"\\/uploads\\/img_tb362L7NgT2Ln6C.jpg\"]', '[\"\\/uploads\\/img_tb362L7NgT2Ln6C.jpg\"]', 24, '2021-02-09 11:46:32', '2021-02-09 11:46:32');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horoscopos`
--

CREATE TABLE `horoscopos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `predicciones` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`predicciones`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `maestros_contactos`
--

CREATE TABLE `maestros_contactos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `contacto_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `maestros_contactos`
--

INSERT INTO `maestros_contactos` (`id`, `user_id`, `contacto_id`, `created_at`, `updated_at`) VALUES
(1, 3, 10, '2021-02-08 00:46:45', '2021-02-08 00:46:45'),
(2, 3, 11, '2021-02-08 00:46:52', '2021-02-08 00:46:52'),
(3, 2, 14, '2021-02-08 00:51:53', '2021-02-08 00:51:53'),
(4, 2, 15, '2021-02-08 00:53:38', '2021-02-08 00:53:38'),
(5, 3, 6, '2021-02-08 12:19:10', '2021-02-08 12:19:10'),
(6, 3, 8, '2021-02-08 18:28:33', '2021-02-08 18:28:33'),
(7, 5, 22, '2021-02-08 18:29:05', '2021-02-08 18:29:22'),
(8, 6, 23, '2021-02-08 18:29:44', '2021-02-08 18:29:44'),
(9, 6, 21, '2021-02-08 18:29:48', '2021-02-08 18:29:48'),
(10, 2, 30, '2021-02-08 18:48:01', '2021-02-08 18:48:01'),
(11, 4, 28, '2021-02-08 18:48:06', '2021-02-08 18:48:06'),
(12, 2, 29, '2021-02-08 18:48:10', '2021-02-08 18:48:10'),
(13, 3, 27, '2021-02-08 18:48:13', '2021-02-08 18:48:13'),
(14, 6, 26, '2021-02-08 18:48:18', '2021-02-08 18:48:18'),
(15, 5, 25, '2021-02-08 18:48:22', '2021-02-08 18:48:22'),
(16, 5, 24, '2021-02-08 18:48:25', '2021-02-08 18:48:25'),
(17, 6, 20, '2021-02-08 18:48:28', '2021-02-08 18:48:28'),
(18, 3, 19, '2021-02-08 18:48:30', '2021-02-08 18:48:30'),
(19, 4, 31, '2021-02-08 18:48:38', '2021-02-08 18:48:38'),
(20, 5, 36, '2021-02-08 19:01:44', '2021-02-08 19:01:50'),
(21, 4, 35, '2021-02-08 19:04:29', '2021-02-08 19:04:29'),
(22, 4, 32, '2021-02-08 19:10:16', '2021-02-08 19:10:16'),
(23, 6, 39, '2021-02-08 19:11:05', '2021-02-08 19:11:05'),
(24, 5, 41, '2021-02-08 19:22:14', '2021-02-08 19:22:14'),
(25, 6, 18, '2021-02-08 19:23:40', '2021-02-08 19:23:40'),
(26, 3, 53, '2021-02-09 12:33:14', '2021-02-09 12:33:14'),
(27, 3, 50, '2021-02-09 12:33:20', '2021-02-09 12:33:20'),
(28, 4, 55, '2021-02-11 17:28:24', '2021-02-11 17:28:26'),
(29, 3, 57, '2021-02-23 03:33:58', '2021-02-23 03:33:58');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `maestros_datos`
--

CREATE TABLE `maestros_datos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `dato_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `maestros_datos`
--

INSERT INTO `maestros_datos` (`id`, `user_id`, `dato_id`, `created_at`, `updated_at`) VALUES
(1, 3, 12, '2021-02-08 19:24:20', '2021-02-09 10:46:03'),
(2, 6, 2, '2021-02-08 19:24:48', '2021-02-08 19:24:48'),
(3, 3, 3, '2021-02-08 19:42:00', '2021-02-09 10:45:53'),
(4, 3, 5, '2021-02-09 00:38:18', '2021-02-09 00:38:18'),
(5, 3, 10, '2021-02-09 10:45:58', '2021-02-09 10:45:58');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(17, '2014_10_12_000000_create_users_table', 1),
(18, '2014_10_12_100000_create_password_resets_table', 1),
(19, '2019_08_19_000000_create_failed_jobs_table', 1),
(20, '2020_12_22_122019_create_contactos_table', 1),
(21, '2020_12_22_214927_create_roles_table', 1),
(22, '2020_12_22_215246_create_roles_users_table', 1),
(23, '2020_12_23_163923_create_facturaciones_table', 1),
(24, '2020_12_23_170241_create_maestros_contactos_table', 1),
(25, '2020_12_25_204315_create_datos_table', 1),
(26, '2021_01_05_194155_create_maestros_datos_table', 1),
(27, '2021_01_06_190013_create_estados_table', 1),
(28, '2021_01_06_191228_create_contactos_estados_table', 1),
(29, '2021_01_08_164016_create_fotos_table', 1),
(30, '2021_01_11_174246_create_estadosf_table', 1),
(31, '2021_01_11_174258_create_facturacion_estado_table', 1),
(32, '2021_02_01_220537_create_horoscopos_table', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `name`, `description`) VALUES
(1, 'Super Admin', 'Super Administrador'),
(2, 'Admin', 'Administrador'),
(3, 'Maestros', 'Maestros');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles_users`
--

CREATE TABLE `roles_users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `rol_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `roles_users`
--

INSERT INTO `roles_users` (`id`, `user_id`, `rol_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2021-02-08 00:43:07', '2021-02-08 00:43:07'),
(2, 2, 2, '2021-02-08 00:43:07', '2021-02-08 00:43:07'),
(3, 3, 3, '2021-02-08 00:43:07', '2021-02-08 00:43:07'),
(4, 4, 3, '2021-02-08 18:28:41', '2021-02-08 18:28:41'),
(5, 5, 3, '2021-02-08 18:28:43', '2021-02-08 18:28:43'),
(6, 6, 3, '2021-02-08 18:28:45', '2021-02-08 18:28:45'),
(7, 7, 3, '2021-02-08 19:25:04', '2021-02-08 19:25:04'),
(8, 8, 3, '2021-02-08 19:25:07', '2021-02-08 19:25:07'),
(9, 9, 3, '2021-02-08 19:25:10', '2021-02-08 19:25:10'),
(10, 10, 3, '2021-02-08 19:25:12', '2021-02-08 19:25:12'),
(11, 11, 3, '2021-02-11 17:29:01', '2021-02-11 17:29:01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Sebas Escobar', 'sebas@admin.com', NULL, '$2y$10$P1ZM.pljilyXtpAXPunEbuLwvazTu4i1CNgIKFEUDkfDJPdRMJJ.m', NULL, '2021-02-08 00:43:05', '2021-02-08 00:43:05'),
(2, 'Yaneth Alba', 'yaneth@yeeteam.com', NULL, '$2y$10$2Pp0z.dpcEBgYoPGd76Beu.Z9su2YalZqpW4b9S563NPFS1upa0se', NULL, '2021-02-08 00:43:05', '2021-02-08 00:43:05'),
(3, 'Agatha 1', 'agatha1@yeeteam.com', NULL, '$2y$10$5689D2CdlefBPVa2/X3vm.d.cnfGynSbB2OOmCm88AlYZwHFzn7Ci', NULL, '2021-02-08 00:43:05', '2021-02-08 00:43:05'),
(4, 'prueba: 4', 'prueba4@admin.com', NULL, '$2y$10$YQsMiuZzkKI/8bNJ7NZLKOFI.Ry1Ht/rOLfdPT36y8rgaU.o6JdsK', NULL, '2021-02-08 18:28:41', '2021-02-08 18:28:41'),
(5, 'prueba: 5', 'prueba5@admin.com', NULL, '$2y$10$Lwib8dktVGKaU3adT1gZPey5RFmoy3bByVu.UTYlhs9q.aHsvJZy.', NULL, '2021-02-08 18:28:43', '2021-02-08 18:28:43'),
(6, 'prueba: 6', 'prueba6@admin.com', NULL, '$2y$10$/6AQxerlpCf7LBIEmPLoFeDxqUTFAqsE5aoMxcKtXkv5djy.FiLFa', NULL, '2021-02-08 18:28:45', '2021-02-08 18:28:45'),
(7, 'prueba: 7', 'prueba7@admin.com', NULL, '$2y$10$fXmjVQcbTjp2SHxXYwnMLuoDbsD4bnneGui28I.kbDX.IkYq65Jem', NULL, '2021-02-08 19:25:04', '2021-02-08 19:25:04'),
(8, 'prueba: 8', 'prueba8@admin.com', NULL, '$2y$10$1NoBtwbshfC5dJtei9yHwemdBoIO2uFB00seaHyIHy77eQKJDQATW', NULL, '2021-02-08 19:25:07', '2021-02-08 19:25:07'),
(9, 'prueba: 9', 'prueba9@admin.com', NULL, '$2y$10$KbsVtdEffOepBHD/uqE9tuOD/dfGjwDIsa1FKJ.CdP7npY2usiV8S', NULL, '2021-02-08 19:25:10', '2021-02-08 19:25:10'),
(10, 'prueba: 10', 'prueba10@admin.com', NULL, '$2y$10$XTpCiJgruREg87qneQ571uFccaBWqMzC328.Uw9grggVoV8X2hgkS', NULL, '2021-02-08 19:25:12', '2021-02-08 19:25:12'),
(11, 'prueba: 11', 'prueba11@admin.com', NULL, '$2y$10$WO4eguXDCF5FS7ttq4YwC.WAPXW7Ym2CrpNNZ2yBXlU5LxM8vDUnq', NULL, '2021-02-11 17:29:01', '2021-02-11 17:29:01');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `contactos`
--
ALTER TABLE `contactos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `contactos_estados`
--
ALTER TABLE `contactos_estados`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contactos_estados_contacto_id_foreign` (`contacto_id`),
  ADD KEY `contactos_estados_estado_id_foreign` (`estado_id`);

--
-- Indices de la tabla `datos`
--
ALTER TABLE `datos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `estados`
--
ALTER TABLE `estados`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `estadosf`
--
ALTER TABLE `estadosf`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `facturaciones`
--
ALTER TABLE `facturaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `facturaciones_user_id_foreign` (`user_id`),
  ADD KEY `facturaciones_contacto_id_foreign` (`contacto_id`);

--
-- Indices de la tabla `facturacion_estado`
--
ALTER TABLE `facturacion_estado`
  ADD PRIMARY KEY (`id`),
  ADD KEY `facturacion_estado_facturacion_id_foreign` (`facturacion_id`),
  ADD KEY `facturacion_estado_estadof_id_foreign` (`estadof_id`);

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indices de la tabla `fotos`
--
ALTER TABLE `fotos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fotos_facturacion_id_foreign` (`facturacion_id`);

--
-- Indices de la tabla `horoscopos`
--
ALTER TABLE `horoscopos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `maestros_contactos`
--
ALTER TABLE `maestros_contactos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `maestros_contactos_user_id_foreign` (`user_id`),
  ADD KEY `maestros_contactos_contacto_id_foreign` (`contacto_id`);

--
-- Indices de la tabla `maestros_datos`
--
ALTER TABLE `maestros_datos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `maestros_datos_user_id_foreign` (`user_id`),
  ADD KEY `maestros_datos_dato_id_foreign` (`dato_id`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `roles_users`
--
ALTER TABLE `roles_users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `roles_users_user_id_foreign` (`user_id`),
  ADD KEY `roles_users_rol_id_foreign` (`rol_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `contactos`
--
ALTER TABLE `contactos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT de la tabla `contactos_estados`
--
ALTER TABLE `contactos_estados`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT de la tabla `datos`
--
ALTER TABLE `datos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `estados`
--
ALTER TABLE `estados`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `estadosf`
--
ALTER TABLE `estadosf`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `facturaciones`
--
ALTER TABLE `facturaciones`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `facturacion_estado`
--
ALTER TABLE `facturacion_estado`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fotos`
--
ALTER TABLE `fotos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `horoscopos`
--
ALTER TABLE `horoscopos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `maestros_contactos`
--
ALTER TABLE `maestros_contactos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `maestros_datos`
--
ALTER TABLE `maestros_datos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `roles_users`
--
ALTER TABLE `roles_users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `contactos_estados`
--
ALTER TABLE `contactos_estados`
  ADD CONSTRAINT `contactos_estados_contacto_id_foreign` FOREIGN KEY (`contacto_id`) REFERENCES `contactos` (`id`),
  ADD CONSTRAINT `contactos_estados_estado_id_foreign` FOREIGN KEY (`estado_id`) REFERENCES `estados` (`id`);

--
-- Filtros para la tabla `facturaciones`
--
ALTER TABLE `facturaciones`
  ADD CONSTRAINT `facturaciones_contacto_id_foreign` FOREIGN KEY (`contacto_id`) REFERENCES `contactos` (`id`),
  ADD CONSTRAINT `facturaciones_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `facturacion_estado`
--
ALTER TABLE `facturacion_estado`
  ADD CONSTRAINT `facturacion_estado_estadof_id_foreign` FOREIGN KEY (`estadof_id`) REFERENCES `estadosf` (`id`),
  ADD CONSTRAINT `facturacion_estado_facturacion_id_foreign` FOREIGN KEY (`facturacion_id`) REFERENCES `facturaciones` (`id`);

--
-- Filtros para la tabla `fotos`
--
ALTER TABLE `fotos`
  ADD CONSTRAINT `fotos_facturacion_id_foreign` FOREIGN KEY (`facturacion_id`) REFERENCES `facturaciones` (`id`);

--
-- Filtros para la tabla `maestros_contactos`
--
ALTER TABLE `maestros_contactos`
  ADD CONSTRAINT `maestros_contactos_contacto_id_foreign` FOREIGN KEY (`contacto_id`) REFERENCES `contactos` (`id`),
  ADD CONSTRAINT `maestros_contactos_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `maestros_datos`
--
ALTER TABLE `maestros_datos`
  ADD CONSTRAINT `maestros_datos_dato_id_foreign` FOREIGN KEY (`dato_id`) REFERENCES `datos` (`id`),
  ADD CONSTRAINT `maestros_datos_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `roles_users`
--
ALTER TABLE `roles_users`
  ADD CONSTRAINT `roles_users_rol_id_foreign` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`),
  ADD CONSTRAINT `roles_users_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
