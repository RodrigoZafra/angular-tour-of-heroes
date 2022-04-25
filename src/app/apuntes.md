El primer parámetro de una función => es el valor de la suscripción, esto es, lo que tenga dentro el observable.

Con una suscripción se te pueden devolver 3 cosas: un valor, puede dar un error o te da un complete.
Son 3 funciones, next, error y complete, y cada una tiene distintos parámetros. Complete siempre salta.
Se aconseja pasar un objeto con las funciones al Observable. 

Te suscribes al inicio del componente. Mirar component lifecycle en Angular, muy importante.
En el ngOnInit se mete lo que quieras que se utilice una vez.
El ngOnDestroy() se lanza cuando el componente se destruye, aquí se suele desuscribir uno de los observables.

El debounce salta cuando lleva un tiempo sin recibir datos para no saltar todo el rato. 
El uso de of es para ejemplos porque no puedes cambiarlo. Se puede usar para testear. 

Subjects: El observable por si solo no tiene información, es un observable de algo. 
Un subject es un objeto que tiene varias funciones básicas y un valor. La diferencia con un observable
es que no tiene información como tal, sino que está mirando a una fuente de información.
Se inicializa o bien vacío o bien con un parámetro que sea el valor inicial. Ese sería un Behaviour Subject.
Una vez que lo creas cada vez que quieres que cambie su valor haces un next. Puedes 
modificar su valor, sea este una variable o un objeto. Se hace con subject.next();

Lo normal es crear un subject, darle valor, y crear un observable que atienda a sus cambios.
A un subject también te puedes suscribir, pero no es necesario para hacerle un next. Lo suyo es crear un
observable con el que suscribirse al subject y que el servicio sea el que cambie el subject. 

Cuando quieres crear un dato que quieres que sea observable creas un behaviour subject/subject, normalmente privado,
y creas un observable público llamando al subject.asObservable(), para suscribirte a él. 

No es lo mismo un filter de un array que de un observable. 
