create table Articles(
	ID int not null auto_increment,
    Costruttore varchar(200),
    Codice varchar(50),
    Descrizione varchar(250),
    PrezzoAcquisto decimal(10,3),
    Ricavo int,
    PrezzoUnitario decimal(10,3),
    UnitaMisura varchar(2),
    primary key(ID)
);

drop table ListItems;

create table ArticleLists (
	ID int not null auto_increment,
    Descrizione varchar(50),
    Stato varchar(1),
    primary key(ID)
)

create table ArticleListItems (
	ID int not null auto_increment,
    ListID int not null,
    ArticleID int not null,
    Quantita float,
    Totale decimal(10,3),
    primary key(ID)
);

