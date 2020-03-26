
-- users
insert
	into
	public."user" (id,
	username,
	email,
	"password",
	"token")
values(uuid_generate_v4(),
'james',
'james@mail.com',
'$2y$12$HiocVvKu2yMGfE3/sSge8.K5Cb5UkTa3.EJTM5vgzLM9FZngLyxsW',
null),
(uuid_generate_v4(),
'pedro',
'pedro@mail.com',
'$2y$12$rst1R6RIhfCTGjcUOjzsGOa9xR7zl/.8UH7zUPhodgaMIbwhRRrsO',
null);
