import React, { useState } from 'react';
import { Plus, Trash2, ChevronDown, Type, List } from 'lucide-react';
import rulesConfig from '../../data/rulesConfig.json';
import { saveConfig } from '../../utils/configSaver';

const RuleConfiguration = () => {
  const [config, setConfig] = useState(rulesConfig);
  const [isExpanded, setIsExpanded] = useState({});
  const [newRuleData, setNewRuleData] = useState({
    categoryKey: '',
    ruleName: '',
    ruleType: '',
    options: []
  });

  const handleAddRule = () => {
    const { categoryKey, ruleName, ruleType } = newRuleData;
    
    if (!categoryKey || !ruleName || !ruleType) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    setConfig(prevConfig => {
      const updatedConfig = { ...prevConfig };
      const newRule = {
        name: ruleName,
        type: ruleType,
        ...(ruleType === 'select' && { options: [] })
      };

      updatedConfig[categoryKey].rules[ruleName.toLowerCase().replace(/\s+/g, '-')] = newRule;
      
      // Sauvegarder dans le fichier JSON
      saveConfig(updatedConfig);

      // Réinitialiser le formulaire
      setNewRuleData({
        categoryKey: '',
        ruleName: '',
        ruleType: '',
        options: []
      });

      return updatedConfig;
    });
  };

  const toggleCategoryExpand = (category) => {
    setIsExpanded(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-orange-500 text-white p-6">
          <h1 className="text-3xl font-bold">Configuration des Règles</h1>
        </div>

        <div className="p-8 space-y-6">
          {/* Formulaire d'ajout de règle */}
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Ajouter une Nouvelle Règle</h2>
            <div className="grid grid-cols-3 gap-4">
              <select
                value={newRuleData.categoryKey}
                onChange={(e) => setNewRuleData(prev => ({ ...prev, categoryKey: e.target.value }))}
                className="p-2 border rounded"
              >
                <option value="">Sélectionner Catégorie</option>
                {Object.keys(config).map(key => (
                  <option key={key} value={key}>{config[key].title}</option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Nom de la Règle"
                value={newRuleData.ruleName}
                onChange={(e) => setNewRuleData(prev => ({ ...prev, ruleName: e.target.value }))}
                className="p-2 border rounded"
              />

              <div className="flex space-x-2">
                <button 
                  onClick={() => setNewRuleData(prev => ({ ...prev, ruleType: 'input' }))}
                  className={`p-2 rounded flex items-center ${newRuleData.ruleType === 'input' ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
                >
                  <Type className="mr-2" /> Input
                </button>
                <button 
                  onClick={() => setNewRuleData(prev => ({ ...prev, ruleType: 'select' }))}
                  className={`p-2 rounded flex items-center ${newRuleData.ruleType === 'select' ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
                >
                  <List className="mr-2" /> Select
                </button>
              </div>
            </div>
            
            <button 
              onClick={handleAddRule}
              className="mt-4 bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Ajouter Règle
            </button>
          </div>

          {/* Liste des règles existantes */}
          <div className="space-y-6">
            {Object.entries(config).map(([categoryKey, category]) => (
              <div
                key={categoryKey}
                className="border border-gray-200 rounded-lg"
              >
                <div
                  onClick={() => toggleCategoryExpand(categoryKey)}
                  className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-100 transition"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{category.icon}</span>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {category.title}
                    </h2>
                  </div>
                  <ChevronDown
                    className={`transform transition-transform ${
                      isExpanded[categoryKey] ? 'rotate-180' : ''
                    }`}
                  />
                </div>

                {isExpanded[categoryKey] && (
                  <div className="p-4 space-y-4">
                    {Object.entries(category.rules).map(([ruleKey, rule]) => (
                      <div
                        key={ruleKey}
                        className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-700">
                            {rule.name} ({rule.type})
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RuleConfiguration;