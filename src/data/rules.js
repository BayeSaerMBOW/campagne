const availableRules = [
  { id: 'minAmount', name: 'Montant minimum', type: 'number' },
  { id: 'maxAmount', name: 'Montant maximum', type: 'number' },
  { id: 'userType', name: 'Type d\'utilisateur', type: 'select', options: ['Particulier', 'Professionnel', 'Commerçant'] },
  { id: 'location', name: 'Localisation', type: 'text' },
  { id: 'frequency', name: 'Fréquence', type: 'select', options: ['Quotidienne', 'Hebdomadaire', 'Mensuelle'] },
  { id: 'serviceType', name: 'Type de service', type: 'select', options: ['Transfert', 'Paiement', 'Retrait'] },
  { id: 'paymentMethod', name: 'Moyen de paiement', type: 'select', options: ['Carte bancaire', 'Chèque', 'Virement'] },
  { id: 'paymentFrequency', name: 'Fréquence de paiement', type: 'select', options: ['Mensuelle', 'Trimestrielle', 'Semestrielle'] },

  // Ajoutez d'autres règles ici...

];

export default availableRules;
