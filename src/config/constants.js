export const subjectTypes = [{
  title: 'les sujets à traiter',
  empty: 'Rien à traiter',
  test: subject => !subject.isVoted && !subject.isClosed && !subject.givenDelegation
}, {
  title: 'les sujets déjà votés',
  empty: 'Vous n\'avez pas encore voté sur un sujet',
  test: subject => subject.isVoted
}, {
  title: 'mes délégations',
  empty: 'Vous n\'avez pas encore délégué de sujet',
  test: subject => !!subject.givenDelegation
}, {
  title: 'mes sujets créés',
  empty: 'Vous n\'avez pas encore créé de sujet',
  test: subject => subject.isMine
}, {
  title: 'les sujets archivés',
  empty: 'Aucune archive',
  test: subject => subject.isClosed
}, {
  title: 'tous les sujets',
  empty: 'Aucun sujet',
  test: subject => true
}]
