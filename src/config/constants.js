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

export const collaborators = [
  'benoit.averty@zenika.com',
  'alexandre.baron@zenika.com',
  'julie.bourhis@zenika.com',
  'antoine.cailly@zenika.com',
  'corentin.cocoual@zenika.com',
  'armel.gouriou@zenika.com',
  'serge.hardy@zenika.com',
  'herri.heas@zenika.com',
  'delphine.millet@zenika.com',
  'martin.mouterde@zenika.com',
  'maxime.odye@zenika.com',
  'kevin.pennarun@zenika.com',
  'benjamin.plouzennec@zenika.com',
  'mathieu.pousse@zenika.com',
  'sylvain.revereault@zenika.com',
  'herminael.rougier@zenika.com',
  'erwann.thebault@zenika.com',
  'benoit.travers@zenika.com',
  'fabien.paitry@zenika.com',
  'yoan.rousseau@zenika.com',
  'valentin.bailleul@zenika.com',
  'laura.guillemot@zenika.com',
  'adrien.cahoreau@zenika.com',
  'jeremie.huchet@zenika.com',
  'nicolas.verle@zenika.com',
  'robin.riclet@zenika.com',
  'mahdi.aici@zenika.com'
]
