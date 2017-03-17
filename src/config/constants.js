export const tabs = [{
  label: 'Sujets à traiter',
  empty: 'Rien à traiter',
  test: subject => !subject.isClosed && !subject.givenDelegation
}, {
  label: 'Sujets déjà votés',
  empty: 'Vous n\'avez pas encore voté sur un sujet',
  test: subject => subject.isVoted
}, {
  label: 'Sujets délégués',
  empty: 'Vous n\'avez pas encore délégué de sujet',
  test: subject => !!subject.givenDelegation
}, {
  label: 'Mes sujets',
  empty: 'Vous n\'avez pas encore créé de sujet',
  test: subject => subject.isMine
}, {
  label: 'Sujets archivés',
  empty: 'Aucune archive',
  test: subject => subject.isClosed
}]
