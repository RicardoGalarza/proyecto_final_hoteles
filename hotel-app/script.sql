INSERT INTO rol (nombre) VALUES ('administrador');
INSERT INTO rol (nombre) VALUES ('cliente');

NSERT INTO permiso (nombre) VALUES ('crear habitacion');
INSERT INTO permiso (nombre) VALUES ('ver listado de habitaciones');
INSERT INTO permiso (nombre) VALUES ('editar habitacion');
INSERT INTO permiso (nombre) VALUES ('ver detalle de habitacion');
INSERT INTO permiso (nombre) VALUES ('listar habitacion');
INSERT INTO permiso (nombre) VALUES ('crear categoria');
INSERT INTO permiso (nombre) VALUES ('listar categoria');
INSERT INTO permiso (nombre) VALUES ('crear cuentas');
INSERT INTO permiso (nombre) VALUES ('administracion');
INSERT INTO permiso (nombre) VALUES ('listar cuentas');
INSERT INTO permiso (nombre) VALUES ('home page');

INSERT INTO rol_permiso (rol_id, permiso_id) VALUES (1, 1);
INSERT INTO rol_permiso (rol_id, permiso_id) VALUES (1, 2);
INSERT INTO rol_permiso (rol_id, permiso_id) VALUES (1, 3);
INSERT INTO rol_permiso (rol_id, permiso_id) VALUES (1, 4);
INSERT INTO rol_permiso (rol_id, permiso_id) VALUES (1, 5);
INSERT INTO rol_permiso (rol_id, permiso_id) VALUES (1, 6);
INSERT INTO rol_permiso (rol_id, permiso_id) VALUES (1, 7);
INSERT INTO rol_permiso (rol_id, permiso_id) VALUES (1, 8);
INSERT INTO rol_permiso (rol_id, permiso_id) VALUES (1, 9);
INSERT INTO rol_permiso (rol_id, permiso_id) VALUES (1, 10);
INSERT INTO rol_permiso (rol_id, permiso_id) VALUES (1, 11);
INSERT INTO rol_permiso (rol_id, permiso_id) VALUES (2, 16);