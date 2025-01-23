// src/utils/configSaver.js
export const saveConfig = (config) => {
    try {
      // Sauvegarder dans localStorage
      localStorage.setItem('rulesConfig', JSON.stringify(config));
      
      // Option : si vous voulez aussi mettre à jour un fichier JSON
      const jsonString = JSON.stringify(config, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'rulesConfig.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Erreur de sauvegarde', error);
    }
  };