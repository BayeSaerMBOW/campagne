import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import availableRules from '../../data/rules'; // Import des règles

const CreateCampaignForm = () => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [droppedRules, setDroppedRules] = useState([]);

  const handleDragStart = (rule) => {
    setDraggedItem(rule);
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
    }
  };

  const handleRemoveRule = (uniqueId) => {
    setDroppedRules(droppedRules.filter(rule => rule.uniqueId !== uniqueId));
  };

  const renderRuleInput = (rule) => {
    switch (rule.type) {
      case 'number':
        return (
          <input
            type="number"
            placeholder={`Entrez ${rule.name.toLowerCase()}`}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        );
      case 'select':
        return (
          <select className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option value="">Sélectionnez une option</option>
            {rule.options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      default:
        return (
          <input
            type="text"
            placeholder={`Entrez ${rule.name.toLowerCase()}`}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        );
    }
  };

  return (
    <div className="max-w-9xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Section des règles disponibles */}
        <div className="md:w-1/3">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Règles disponibles
          </h2>
          <div className="bg-white rounded-lg shadow-md p-4 space-y-2">
            {availableRules.map((rule) => (
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

        {/* Section de configuration */}
        <div className="md:w-2/3">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Configuration de la campagne
          </h2>
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Nom de la campagne"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <textarea
                  placeholder="Description de la campagne"
                  className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Règles déposées */}
              {droppedRules.length > 0 && (
                <div className="space-y-4 pt-4">
                  <h3 className="font-medium text-gray-700">Règles configurées</h3>
                  {droppedRules.map((rule) => (
                    <div key={rule.uniqueId} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-700">{rule.name}</span>
                        <button
                          onClick={() => handleRemoveRule(rule.uniqueId)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      {renderRuleInput(rule)}
                    </div>
                  ))}
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
    </div>
  );
};

export default CreateCampaignForm;
