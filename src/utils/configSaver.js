export const saveConfig = (config) => {
  const url = "http://localhost:3271";
  const save = async (path, data) => {
    try {
      const response = await fetch(`${url}/${path}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      console.log(`Résultat de la sauvegarde pour ${path}:`, response.ok);
    } catch (error) {
      console.log(`Erreur lors de la sauvegarde de ${path}:`, error.message);
    }
  };

  const saveAllConfig = async () => {
    try {
      const entries = Object.entries(config);
      const savePromises = entries.map(async ([key, value]) => {
        await save(key, value);
      });
      await Promise.all(savePromises);
      console.log("Toutes les configurations ont été sauvegardées.");
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des configurations:", error.message);
    }
  };

  saveAllConfig();
};