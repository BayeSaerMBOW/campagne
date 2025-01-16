import React, { useState } from 'react';
import { AlertCircle,Plus, X,CheckCircle2, FileText, Smartphone } from 'lucide-react';
import rulesConfig from '../../data/rulesConfig.json';

const CreateCampaignForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    technicalSim: {
      msisdn: '',
      enabled: false
    }
  });
  const [draggedItem, setDraggedItem] = useState(null);
  const [droppedRules, setDroppedRules] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [activeCategories, setActiveCategories] = useState(new Set());
  const [showSummary, setShowSummary] = useState(false);
  const [ruleValues, setRuleValues] = useState({});
  const [conditionTypes, setConditionTypes] = useState({});


  const handleDragStart = (rule) => {
    setDraggedItem(rule);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('sim.')) {
      const simField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        technicalSim: {
          ...prev.technicalSim,
          [simField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  const handleConditionTypeChange = (uniqueId, value) => {
    setConditionTypes(prev => ({
      ...prev,
      [uniqueId]: value
    }));
    
    // Reset les valeurs existantes pour ce rule
    setRuleValues(prev => ({
      ...prev,
      [uniqueId]: {}
    }));
  };

  

  const toggleTechnicalSim = () => {
    setFormData(prev => ({
      ...prev,
      technicalSim: {
        ...prev.technicalSim,
        enabled: !prev.technicalSim.enabled
      }
    }));
  };
  
  const handleRuleValueChange = (uniqueId, value) => {
    setRuleValues(prev => ({
      ...prev,
      [uniqueId]: value
    }));
  };
  

  const getFlattenedRules = (category) => {
    const rules = [];
    const processObject = (obj, parentKey = '') => {
      Object.entries(obj).forEach(([key, value]) => {
        const fullKey = parentKey ? `${parentKey}.${key}` : key;
        if (value.type) {
          // Pour les règles de type range, on conserve la structure complète
          if (value.type === 'range') {
            rules.push({
              id: fullKey,
              name: value.name,
              type: value.type,
              min: value.min,
              max: value.max,
              category
            });
          } else {
            rules.push({
              id: fullKey,
              name: value.name,
              type: value.type,
              options: value.options,
              category
            });
          }
        } else if (typeof value === 'object' && !value.type) {
          processObject(value, fullKey);
        }
      });
    };
    processObject(rulesConfig[category].rules);
    return rules;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedItem) {
      const newRule = {
        ...draggedItem,
        uniqueId: `${draggedItem.id}-${Date.now()}`
      };
      setDroppedRules([...droppedRules, newRule]);
      setDraggedItem(null);
      setActiveCategories(prev => new Set([...prev, draggedItem.category]));
    }
  };

  const handleRemoveRule = (uniqueId) => {
    const ruleToRemove = droppedRules.find(rule => rule.uniqueId === uniqueId);
    const updatedRules = droppedRules.filter(rule => rule.uniqueId !== uniqueId);
    setDroppedRules(updatedRules);
    
    // Supprime également la valeur associée
    const newRuleValues = { ...ruleValues };
    delete newRuleValues[uniqueId];
    setRuleValues(newRuleValues);
    
    // Si c'était la dernière règle de cette catégorie, retire la catégorie des actives
    if (!updatedRules.some(rule => rule.category === ruleToRemove.category)) {
      const newActiveCategories = new Set(activeCategories);
      newActiveCategories.delete(ruleToRemove.category);
      setActiveCategories(newActiveCategories);
    }
  };
  const renderRangeInput = (rule, uniqueId) => {
    const value = ruleValues[uniqueId] || {};
    const conditionType = conditionTypes[uniqueId] || 'equal';

    return (
      <div className="space-y-4">
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-2">Type de condition</label>
          <select
            value={conditionType}
            onChange={(e) => handleConditionTypeChange(uniqueId, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="equal">Égal à</option>
            <option value="greater">Supérieur à</option>
            <option value="greaterEqual">Supérieur ou égal à</option>
            <option value="between">Compris entre</option>
          </select>
        </div>

        {conditionType === 'between' ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm text-gray-600">Valeur minimum</label>
              <input
                type="number"
                step={rule.min.type === 'float' ? '0.01' : '1'}
                value={value.min || ''}
                onChange={(e) => handleRuleValueChange(uniqueId, {
                  ...value,
                  min: e.target.value
                })}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm text-gray-600">Valeur maximum</label>
              <input
                type="number"
                step={rule.max.type === 'float' ? '0.01' : '1'}
                value={value.max || ''}
                onChange={(e) => handleRuleValueChange(uniqueId, {
                  ...value,
                  max: e.target.value
                })}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <label className="block text-sm text-gray-600">Valeur</label>
            <input
              type="number"
              step={rule.min.type === 'float' ? '0.01' : '1'}
              value={value.value || ''}
              onChange={(e) => handleRuleValueChange(uniqueId, {
                ...value,
                value: e.target.value
              })}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        )}
      </div>
    );
  };

  const renderRuleInput = (rule, uniqueId) => {
    const value = ruleValues[uniqueId] || '';
      
    if (rule.type === 'range') {
      return renderRangeInput(rule, uniqueId);
    }
      
    switch (rule.type) {
      case 'select':
        return (
          <select 
            value={value}
            onChange={(e) => handleRuleValueChange(uniqueId, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Sélectionnez une option</option>
            {rule.options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      case 'date':
        return (
          <input
            type="datetime-local"
            value={value}
            onChange={(e) => handleRuleValueChange(uniqueId, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        );
      default:
        return (
          <input
            type="text"
            placeholder={`Entrez ${rule.name.toLowerCase()}`}
            value={value}
            onChange={(e) => handleRuleValueChange(uniqueId, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        );
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const campaignData = {
      ...formData,
      rules: droppedRules.map(rule => ({
        ...rule,
        value: ruleValues[rule.uniqueId]
      }))
    };
    console.log('Données de la campagne:', campaignData);
    // Ici vous pouvez ajouter la logique pour envoyer les données à votre API logique bi fila wara nekk
  };
  const TechnicalSimSection = () => (
    <div className="border border-gray-200 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-orange-500" />
          <h3 className="font-medium text-gray-800">SIM Technique</h3>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={formData.technicalSim.enabled}
            onChange={toggleTechnicalSim}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
        </label>
      </div>
  
      {formData.technicalSim.enabled && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Numéro MSISDN
            </label>
            <input
              type="text"
              name="sim.msisdn"
              value={formData.technicalSim.msisdn}
              onChange={handleInputChange}
              placeholder="Ex: +221771234567"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
      )}
    </div>
  );
  
  const formatRuleValue = (rule, value, conditionType = 'equal') => {
    if (!value) return 'Non défini';
    
    if (rule.type === 'range') {
      if (conditionType === 'between') {
        if (!value.min && !value.max) return 'Non défini';
        return `Compris entre ${value.min || 0} et ${value.max}`;
      } else {
        const operators = {
          equal: 'Égal à',
          greater: 'Supérieur à',
          greaterEqual: 'Supérieur ou égal à'
        };
        return `${operators[conditionType]} ${value.value}`;
      }
    }
    return value || 'Non défini';
  };

  const RulesSummary = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Récapitulatif des règles</h2>
            <button
              onClick={() => setShowSummary(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
  
          {/* Section SIM Technique */}
          {formData.technicalSim.enabled && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Smartphone className="w-5 h-5 text-orange-500" />
                <h3 className="font-semibold text-lg">SIM Technique</h3>
              </div>
              <div className="space-y-2 pl-8">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">MSISDN:</span>
                  <span className="font-medium">{formData.technicalSim.msisdn || 'Non défini'}</span>
                </div>
              </div>
            </div>
          )}
  
          {/* Informations générales */}
          <div className="mb-4">
            <h3 className="font-medium text-gray-700">Informations générales</h3>
            <div className="mt-2 space-y-2">
              <p><span className="font-medium">Nom de la campagne:</span> {formData.name || 'Non défini'}</p>
              <p><span className="font-medium">Description:</span> {formData.description || 'Non défini'}</p>
            </div>
          </div>
  
          {/* Règles par catégorie */}
          {Object.keys(rulesConfig).map(category => {
            const categoryRules = droppedRules.filter(rule => rule.category === category);
            if (categoryRules.length === 0) return null;
  
            return (
              <div key={category} className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{rulesConfig[category].icon}</span>
                  <h3 className="font-semibold text-lg">{rulesConfig[category].title}</h3>
                </div>
                <div className="space-y-2 pl-8">
                  {categoryRules.map(rule => (
                    <div key={rule.uniqueId} className="flex justify-between items-center">
                      <span className="text-gray-700">{rule.name}:</span>
                      <span className="font-medium">
                        {formatRuleValue(rule, ruleValues[rule.uniqueId], conditionTypes[rule.uniqueId])}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-orange-600">
          
        </h1>
        {droppedRules.length > 0 && (
          <button
            onClick={() => setShowSummary(true)}
            className="flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-lg hover:bg-orange-200"
          >
            <FileText className="w-5 h-5" />
            Voir le récapitulatif
          </button>
        )}
      </div>

      {/* Catégories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {Object.entries(rulesConfig).map(([categoryKey, category]) => (
          <div
            key={categoryKey}
            onClick={() => setExpandedCategory(expandedCategory === categoryKey ? null : categoryKey)}
            className={`cursor-pointer rounded-lg p-4 transition-all transform hover:scale-105 ${
              activeCategories.has(categoryKey)
                ? 'bg-orange-100 border-2 border-orange-500'
                : 'bg-white border border-gray-200'
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="text-2xl">{category.icon}</div>
              {activeCategories.has(categoryKey) && (
                <CheckCircle2 className="w-5 h-5 text-orange-500" />
              )}
            </div>
            <h3 className="text-lg font-semibold mb-1">{category.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{category.description}</p>
            {activeCategories.has(categoryKey) && (
              <div className="text-sm text-orange-600">
                {droppedRules.filter(rule => rule.category === categoryKey).length} règle(s) configurée(s)
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Section des règles disponibles */}
        {expandedCategory && (
          <div className="md:w-1/3">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Règles {rulesConfig[expandedCategory].title}
            </h2>
            <div className="bg-white rounded-lg shadow-md p-4 space-y-2">
              {getFlattenedRules(expandedCategory).map((rule) => (
                <div
                  key={rule.id}
                  draggable
                  onDragStart={() => handleDragStart(rule)}
                  className="flex items-center p-3 border border-gray-200 rounded hover:bg-gray-50 cursor-move transition-colors"
                >
                  <Plus className="w-5 h-5 text-orange-500 mr-2" />
                  <span className="text-gray-700">{rule.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section de configuration */}
           <div className={expandedCategory ? 'md:w-2/3' : 'w-full'}>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Configuration de la campagne
          </h2>
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nom de la campagne"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Description de la campagne"
                  className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <TechnicalSimSection />

              {/* Règles déposées */}
              {droppedRules.length > 0 && (
                <div className="space-y-4 pt-4">
                  <h3 className="font-medium text-gray-700">Règles configurées</h3>
                  {Object.keys(rulesConfig).map(category => {
                    const categoryRules = droppedRules.filter(rule => rule.category === category);
                    if (categoryRules.length === 0) return null;

                    return (
                      <div key={category} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xl">{rulesConfig[category].icon}</span>
                          <h4 className="font-medium text-gray-800">{rulesConfig[category].title}</h4>
                        </div>
                        <div className="space-y-4">
                          {categoryRules.map((rule) => (
                            <div key={rule.uniqueId} className="border border-gray-100 rounded-lg p-4 bg-gray-50">
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium text-gray-700">{rule.name}</span>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveRule(rule.uniqueId)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                              {renderRuleInput(rule, rule.uniqueId)}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
                >
                  Créer la campagne
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {showSummary && <RulesSummary />}
     
    </div>
  );
};


export default CreateCampaignForm;