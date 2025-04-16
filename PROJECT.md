# Gestão de projeto do bolt.diy

Primeiro de tudo: sabemos que isso soa engraçado. "Gestão de projeto" vem de um mundo corporativo, e este projeto está longe de ser empresarial — ainda é anarquia por aqui 😉

Mas precisamos nos organizar de algum jeito, certo?

> Resumindo: Temos um quadro de projeto com épicos e funcionalidades. Usamos PRs como changelog e como funcionalidades materializadas. Veja [aqui](https://github.com/orgs/stackblitz-labs/projects/4).

Veja como estruturamos a visão de longo prazo, as capacidades de médio prazo do software e as melhorias de curto prazo.

## Épicos estratégicos (longo prazo)

Épicos estratégicos definem áreas em que o produto evolui. Normalmente, esses épicos não se sobrepõem. Eles permitem que o time principal defina o que acredita ser mais importante e deve ser priorizado.

Você pode encontrar os [épicos como issues](https://github.com/stackblitz-labs/bolt.diy/labels/epic), que provavelmente nunca serão fechados.

Qual o benefício/propósito dos épicos?

1. Priorização

Por exemplo: podemos dizer "gerenciar arquivos é mais importante do que qualidade". Então, pensamos em quais funcionalidades avançam "gerenciar arquivos". Podem ser diferentes, como "fazer upload de arquivos locais", "importar de um repositório" ou também desfazer/refazer/commit.

Em uma reunião (mais ou menos) regular dedicada a isso, o time principal discute quais épicos importam mais, esboça funcionalidades e vê quem pode trabalhar nelas. Depois da reunião, atualizam o roadmap (pelo menos para o próximo ciclo de desenvolvimento) e assim comunicam onde está o foco do momento.

2. Agrupamento de funcionalidades

Ao vincular funcionalidades a épicos, conseguimos mantê-las juntas e documentar _por que_ estamos investindo esforço em algo específico.

## Funcionalidades (médio prazo)

Provavelmente todos conhecem dezenas de metodologias para descrever funcionalidades (User story, função de negócio, etc).

Porém, aqui descrevemos funcionalidades de forma propositalmente vaga. Por quê? Todo mundo adora critérios de aceitação bem definidos, né? Bom, todo product owner adora. Porque ele sabe o que vai receber quando estiver pronto.

Mas: **não há dono deste produto**. Por isso, damos _máxima flexibilidade ao desenvolvedor que contribui com uma funcionalidade_ — para que ele possa trazer suas ideias e se divertir implementando.

A funcionalidade tenta descrever _o que_ deve ser melhorado, mas não em detalhes _como_.

## PRs como funcionalidades materializadas (curto prazo)

Quando um dev começa a trabalhar em uma funcionalidade, um draft-PR _pode_ ser aberto o quanto antes para compartilhar, descrever e discutir como ela será implementada. Mas: não é obrigatório. Só ajuda a receber feedback cedo e envolver outros devs. Às vezes, o dev só quer começar e abre o PR depois.

Em um projeto pouco organizado, pode acontecer de vários PRs serem abertos para a mesma funcionalidade. Não é um grande problema: normalmente, quem está empolgado com uma solução topa juntar forças para concluir juntos. E se outro dev foi mais rápido e já fez a mesma funcionalidade: comemore que está pronto, feche o PR e procure a próxima coisa legal para implementar 🤓

## PRs como changelog

Quando um PR é mesclado, um commit squash contém toda a descrição do PR, o que permite um bom changelog.
Todos os autores dos commits do PR são mencionados na mensagem do commit squash e viram contribuidores 🙌
