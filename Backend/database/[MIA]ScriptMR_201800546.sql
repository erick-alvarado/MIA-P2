DROP TABLE formato CASCADE CONSTRAINTS;
DROP TABLE categoria CASCADE CONSTRAINTS;
DROP TABLE departamento CASCADE CONSTRAINTS;
DROP TABLE puesto CASCADE CONSTRAINTS;
DROP TABLE detalle_categoria CASCADE CONSTRAINTS;
DROP TABLE requisito CASCADE CONSTRAINTS;
DROP TABLE detalle_formato CASCADE CONSTRAINTS;
DROP TABLE usuario CASCADE CONSTRAINTS;
DROP TABLE expediente CASCADE CONSTRAINTS;
DROP TABLE solicitud CASCADE CONSTRAINTS;
DROP TABLE detalle_requisito CASCADE CONSTRAINTS;
DROP TABLE chat CASCADE CONSTRAINTS;
DROP TABLE mensaje CASCADE CONSTRAINTS;

CREATE TABLE formato 
(
    id_formato  NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1),
    nombre VARCHAR(10) NOT NULL,
    CONSTRAINT id_formato PRIMARY KEY (id_formato)
);
CREATE TABLE categoria 
(
    id_categoria  NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1),
    nombre VARCHAR(50) NOT NULL,
    CONSTRAINT id_categoria PRIMARY KEY (id_categoria)
);
CREATE TABLE departamento 
(
    id_departamento  NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1),
    id_departamento_aux NUMBER,
    nombre VARCHAR(50) NOT NULL,
    capital NUMBER NOT NULL,
    CONSTRAINT id_departamento PRIMARY KEY (id_departamento),

    CONSTRAINT id_departamento_aux
        FOREIGN KEY (id_departamento_aux)
        REFERENCES departamento(id_departamento)
        ON DELETE CASCADE

);

CREATE TABLE puesto 
(
    id_puesto  NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1),
    id_puesto_departamento NUMBER,
    nombre VARCHAR(50) NOT NULL,
    salario NUMBER NOT NULL,
    calificacion NUMBER NOT NULL,
    url_imagen VARCHAR(200),

    CONSTRAINT id_puesto PRIMARY KEY (id_puesto),

    CONSTRAINT id_puesto_departamento
        FOREIGN KEY (id_puesto_departamento)
        REFERENCES departamento(id_departamento)
        ON DELETE CASCADE

);

CREATE TABLE detalle_categoria 
(
    id_detalle_categoria  NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1),
    id_detalle_categoria_categoria NUMBER,
    id_detalle_categoria_puesto NUMBER,

    CONSTRAINT id_detalle_categoria PRIMARY KEY (id_detalle_categoria),

    CONSTRAINT id_detalle_categoria_categoria
        FOREIGN KEY (id_detalle_categoria_categoria)
        REFERENCES categoria(id_categoria)
        ON DELETE CASCADE,

    CONSTRAINT id_detalle_categoria_puesto
        FOREIGN KEY (id_detalle_categoria_puesto)
        REFERENCES puesto(id_puesto)
        ON DELETE CASCADE

);

CREATE TABLE requisito 
(
    id_requisito  NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1),
    id_requisito_puesto NUMBER,
    nombre VARCHAR(500) NOT NULL,
    tamano NUMBER,
    obligatorio NUMBER,

    CONSTRAINT id_requisito PRIMARY KEY (id_requisito),

    CONSTRAINT id_requisito_puesto
        FOREIGN KEY (id_requisito_puesto)
        REFERENCES puesto(id_puesto)
        ON DELETE CASCADE

);

CREATE TABLE detalle_formato 
(
    id_detalle_formato  NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1),
    id_detalle_formato_requisito NUMBER,
    id_detalle_formato_formato NUMBER,

    CONSTRAINT id_detalle_formato PRIMARY KEY (id_detalle_formato),

    CONSTRAINT id_detalle_formato_requisito
        FOREIGN KEY (id_detalle_formato_requisito)
        REFERENCES requisito(id_requisito)
        ON DELETE CASCADE,

    CONSTRAINT id_detalle_formato_formato
        FOREIGN KEY (id_detalle_formato_formato)
        REFERENCES formato(id_formato)
        ON DELETE CASCADE

);

CREATE TABLE usuario 
(
    id_usuario  NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1),
    id_usuario_departamento NUMBER,
    usuario VARCHAR(30) NOT NULL,
    contrasena VARCHAR(30) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE,
    rol VARCHAR(30) NOT NULL,
    estado NUMBER,

    CONSTRAINT id_usuario PRIMARY KEY (id_usuario),

    CONSTRAINT id_usuario_departamento
        FOREIGN KEY (id_usuario_departamento)
        REFERENCES departamento(id_departamento)
        ON DELETE CASCADE

);

CREATE TABLE expediente 
(
    id_expediente  NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1),
    dpi NUMBER,
    nombres VARCHAR(30) NOT NULL,
    apellidos VARCHAR(30) NOT NULL,
    correo VARCHAR(50) NOT NULL,
    direccion VARCHAR(50) NOT NULL,
    telefono NUMBER,
    url_cv VARCHAR(100) NOT NULL,

    CONSTRAINT id_expediente PRIMARY KEY (id_expediente)

);

CREATE TABLE solicitud 
(
    id_solicitud  NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1),
    id_solicitud_puesto NUMBER,
    id_solicitud_expediente NUMBER,
    id_solicitud_usuario NUMBER,
    estado VARCHAR(30) NOT NULL,

    CONSTRAINT id_solicitud PRIMARY KEY (id_solicitud),

    CONSTRAINT id_solicitud_puesto
        FOREIGN KEY (id_solicitud_puesto)
        REFERENCES puesto(id_puesto)
        ON DELETE CASCADE,

    CONSTRAINT id_solicitud_expediente
        FOREIGN KEY (id_solicitud_expediente)
        REFERENCES expediente(id_expediente)
        ON DELETE CASCADE,

    CONSTRAINT id_solicitud_usuario
        FOREIGN KEY (id_solicitud_usuario)
        REFERENCES usuario(id_usuario)
        ON DELETE CASCADE

);

CREATE TABLE detalle_requisito 
(
    id_detalle_requisito  NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1),
    id_detalle_requisito_solicitud NUMBER,
    id_detalle_requisito_requisito NUMBER,
    url_ VARCHAR(100) NOT NULL,
    estado VARCHAR(30) NOT NULL,


    CONSTRAINT id_detalle_requisito PRIMARY KEY (id_detalle_requisito),

    CONSTRAINT id_detalle_requisito_requisito
        FOREIGN KEY (id_detalle_requisito_requisito)
        REFERENCES requisito(id_requisito)
        ON DELETE CASCADE,

    CONSTRAINT id_detalle_requisito_solicitud
        FOREIGN KEY (id_detalle_requisito_solicitud)
        REFERENCES solicitud(id_solicitud)
        ON DELETE CASCADE

);

CREATE TABLE chat 
(
    id_chat  NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1),
    id_chat_usuario1 NUMBER,
    id_chat_usuario2 NUMBER,

    CONSTRAINT id_chat PRIMARY KEY (id_chat),

    CONSTRAINT id_chat_usuario1
        FOREIGN KEY (id_chat_usuario1)
        REFERENCES usuario(id_usuario)
        ON DELETE CASCADE,
        
    CONSTRAINT id_chat_usuario2
        FOREIGN KEY (id_chat_usuario2)
        REFERENCES usuario(id_usuario)
        ON DELETE CASCADE

);

CREATE TABLE mensaje 
(
    id_mensaje  NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1),
    id_mensaje_usuario NUMBER,
    id_mensaje_chat NUMBER,
    texto VARCHAR(200) NOT NULL,
    hora DATE,
    CONSTRAINT id_mensaje PRIMARY KEY (id_mensaje),

    CONSTRAINT id_mensaje_usuario
        FOREIGN KEY (id_mensaje_usuario)
        REFERENCES usuario(id_usuario)
        ON DELETE CASCADE,
        
    CONSTRAINT id_mensaje_chat
        FOREIGN KEY (id_mensaje_chat)
        REFERENCES chat(id_chat)
        ON DELETE CASCADE

);