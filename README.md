# Recuperação de Senha

**RF** <!-- Quais são as funcionalidades dentro do escopo -->
[X] - O usuário deve poder recuperar sua senha informando o seu e-mail;
[X] - O usuário deve receber um e-mail com instruções de recuperação de senha;
[X] - O usuário deve poder resetar sua senha;

**RNF** <!-- Parte técnica - Quais bibliotecas vamos usar, BD -->
[X] - Utilizar Mailtrap para testar envios em ambiente de desenvolvimento;
[] - Utilizar amazon SES para envios em produção;
[] - Envio de E-mails deve acontecer em segundo plano (background job);


**RN** <!-- Regra de negócio-->
[X] - O link enviado por email deve expirar em 2h;
[X] - O usuário precisa confirmar nova senha ao resetar sua senha;

# Atualização do Perfil

**RF** 
[] - O usuário deve poder atualizar seu perfil  informando nome, email, senha;

**RN**
[X] - O usuário não pode alterar seu email para um email já utilizado;
[] - Para atualizar sua senha o usuário deve informar senha antiga;
[] - Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Painel do Prestador

**RF**
[] - O usuário deve poder listar seus agendamentos de um dia específico;
[] - O prestador deve receber uma notificação sempre que houver um novo agendamento;
[] - O prestador deve poder visualizar as notificações não lidas;

**RNF**
[] - O agendamento do prestador no dia devem ser armazenados em cache;
[] - As notificações do prestador devem ser armazenadas no MongoDB;
[] - As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN**
[] - A notificação deve ter um status de lida ou não lida para que o prestador possa controlar;

# Agendamento de Serviços

**RF**
[] - O usuário deve poder listar todos os prestadores de serviço cadastrados;
[] - O usuário deve poder Listar os dias de um mês com pelo menos um horário disponível de um prestador;
[] - O usuário deve poder listar horários disponíveis em um dia especifico de um prestador;
[] - O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**
[] - A listagem de prestadores deve ser armazenada em cache;

**RN**
[] - Cada agendamento deve durar 1h exatamente;
[] - Os agendamentos devem estar disponíveis entre 8h às 18h, (Primeiro as 8h, último às 17h);
[] - O usuário não pode agendar em um horário já ocupado;
[] - O usuário não pode agendar em uma data inválida;
[] - O usuário não pode agendar serviços consigo mesmo;
