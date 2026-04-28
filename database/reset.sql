-- =====================================================================
-- reset.sql — Limpia todos los datos de AstronomiaDB
-- Ejecutar en SSMS con base de datos AstronomiaDB seleccionada
-- Despues: reiniciar la app y llamar POST /api/admin/importar
-- =====================================================================

USE AstronomiaDB;
GO

-- Romper FK circular antes de borrar
UPDATE sistemas_planetarios SET estrella_central_id = NULL;
GO

DELETE FROM consultas_log;
DELETE FROM relaciones;
DELETE FROM objetos_astronomicos;
DELETE FROM sistemas_planetarios;
DELETE FROM constelaciones;
DELETE FROM tipos_objeto;
GO

-- Reiniciar contadores de identidad
DBCC CHECKIDENT ('consultas_log',        RESEED, 0);
DBCC CHECKIDENT ('relaciones',           RESEED, 0);
DBCC CHECKIDENT ('objetos_astronomicos', RESEED, 0);
DBCC CHECKIDENT ('sistemas_planetarios', RESEED, 0);
DBCC CHECKIDENT ('constelaciones',       RESEED, 0);
DBCC CHECKIDENT ('tipos_objeto',         RESEED, 0);
GO

PRINT 'BD limpia. Abrir la app y llamar POST /api/admin/importar';
