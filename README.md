# standb

Projekat III iz predmeta Napredne baze podataka. **_standb_** omogućava postavljanje i pretraživanje oglasa o nekretninama. Takođe, registrovani korisnici imaju mogućnost da postavljaju pitanja i komentare na postojuće objave i da čuvaju svoje omiljene oglase.

//TODO Tim

- Milan Lukić 17728
- Luka Kocić 17714
- Andrija Mitić 17805

## Tehnologije

- MongoDB
- ASP.NET 7
- React & Typescript
- Material UI

## Pokretanje

Pre pokretanja projekta pokrenuti MongoDB bazu na lokalnoj mašini, na portu **27017**.

### Napomena

Osnovni root admin nalog biće kreiran pri pokretanju aplikacije radi testiranja svih funkcionalnosti aplikacije.

```
email: admin@elfak.rs
password: admin
```

Backend:

```
cd Backend
dotnet restore
dotnet run
```

Frontend:

```
cd Frontend
npm i
npm run dev
```

## Pregled

### Prijavljivanje

![Prijava](/assets/1.png)

### Registracija

![Registracija](/assets/3.png)

### Kreiranje oglasa

![Početna stranica](/assets/4.png)
![Početna stranica](/assets/5.png)

### Detalji oglasa

![Obaveštenja](/assets/2.png)
