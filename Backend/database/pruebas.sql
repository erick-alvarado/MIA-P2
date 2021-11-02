
select * from departamento
select * from puesto
select * from categoria
select * from detalle_categoria 
select * from requisito
select * from formato
select * from detalle_formato
select * from usuario
select * from expediente
select * from solicitud
select * from detalle_requisito
select * from chat
select id_mensaje, id_mensaje_usuario,id_mensaje_chat,texto, to_char(hora,'yyyy/mm/dd hh24:mi:ss') from mensaje ORDER BY hora


insert into departamento(nombre,capital) values('nom1',234)
insert into puesto (id_puesto_departamento, nombre,salario,calificacion,url_imagen) values (1, 'puesto',4000,5,'urlejemplo')
insert into categoria (nombre) values ('categoria1')
insert into detalle_categoria (id_detalle_categoria_categoria ,id_detalle_categoria_puesto) values (1,1)
insert into requisito(id_requisito_puesto, nombre) values (1,'requisito1')
insert into formato (nombre) values('pdf')
insert into detalle_formato ( id_detalle_formato_requisito,id_detalle_formato_formato) values ( 1,2)
insert into usuario ( id_usuario_departamento, usuario, contrasena, fecha_inicio, rol) values (1,'admin','admin',CURRENT_TIMESTAMP,'admin')
insert into usuario ( id_usuario_departamento, usuario, contrasena, fecha_inicio, rol) values (1,'user','user',CURRENT_TIMESTAMP,'user')
insert into expediente ( dpi, nombres,apellidos,correo,direccion,telefono,url_cv) values ( 283182741010, 'Erick alv' ,'ostias','CorreoEjemplo@gmail.com','dir',23124543,'url_cv')
insert into solicitud (id_solicitud_puesto, id_solicitud_expediente,estado) values (1,1,'estado1')
insert into detalle_requisito(id_detalle_requisito_solicitud, id_detalle_requisito_requisito, url_, estado) values (1,1, 'url2' , 'denegado')
insert into chat (id_chat_usuario1, id_chat_usuario2) values (1,2)
insert into mensaje(id_mensaje_usuario,id_mensaje_chat,texto,hora) values (1,1,'Mensaje 1', sysdate)
insert into mensaje(id_mensaje_usuario,id_mensaje_chat,texto,hora) values (2,1,'Respuesta 1', sysdate)




insert into destination select 'id', 'xyz' from dual 
where not exists (select id from destination where id = 'id')

insert into OPT (email, campaign_id)  select 'mom@cox.net',100 from dual
where not exists(select * from OPT  where (email ='mom@cox.net' and campaign_id =100));