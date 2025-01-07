import React, { useState } from "react";
import {
  Plus,
  X,
  ChevronDown,
  ChevronUp,
  Target,
  Building2,
  Receipt,
  Gift,
} from "lucide-react";

const CATEGORIES = {
  cibles: {
    name: "Cibles",
    icon: Target,
    description: "Définir les critères de ciblage des utilisateurs",
  },
  partenaires: {
    name: "Partenaires",
    icon: Building2,
    description: "Sélectionner les partenaires concernés",
  },
  transaction: {
    name: "Transactions",
    icon: Receipt,
    description: "Configurer les conditions de transaction",
  },
  recompenses: {
    name: "Récompenses",
    icon: Gift,
    description: "Définir les récompenses de la campagne",
  },
};

const createRulesFromJson = () => {
  return {
    cibles: [
      {
        id: "age",
        name: "Âge",
        type: "number",
        placeholder: "Entrez l'âge minimum",
      },
      {
        id: "sexe",
        name: "Sexe",
        type: "select",
        options: ["Homme", "Femme"],
      },
      {
        id: "statut",
        name: "Statut",
        type: "select",
        options: ["actif", "inactif", "lite", "full"],
      },
    ],
    partenaires: [
      {
        id: "partenaires",
        name: "Partenaires",
        type: "multiSelect",
        options: ["AUCHAN", "RAPIDO", "WOYOFAL", "SENEAU"],
      },
    ],
    transaction: [
      {
        id: "transaction_amount",
        name: "Montant de transaction",
        type: "rangeNumber",
        placeholderMin: "Montant minimum",
        placeholderMax: "Montant maximum",
      },
      {
        id: "transaction_datetime",
        name: "Période de transaction",
        type: "dateRange",
      },
      {
        id: "transaction_gateway_type",
        name: "Type de passerelle",
        type: "select",
        options: ["USSD", "WEB"],
      },
      {
        id: "transaction_subtype",
        name: "Type de transaction",
        type: "select",
        options: ["P2P", "CASHIN", "RC", "B2BMERCHPAY", "CASHOUT", "MERCHPAY"],
      },
      {
        id: "transaction_user_type",
        name: "Type d'utilisateur",
        type: "select",
        options: ["CHANNEL", "SUBSCRIBER"],
      },
    ],
    recompenses: [
      {
        id: "remise_frais",
        name: "Remise sur frais",
        type: "percentage",
        placeholder: "Pourcentage de remise",
      },
      {
        id: "credit",
        name: "Crédit",
        type: "number",
        placeholder: "Montant du crédit",
      },
      {
        id: "minutes_appel",
        name: "Minutes d'appel",
        type: "number",
        placeholder: "Nombre de minutes",
      },
      {
        id: "passe_internet",
        name: "Pass Internet",
        type: "number",
        placeholder: "Taille du pass en Mo",
      },
    ],
  };
};
const RuleCategoryHeader = ({ category }) => {
  const IconComponent = CATEGORIES[category].icon;
  return (
    <h3 className="font-medium text-lg text-gray-700 flex items-center gap-2">
      <IconComponent className="w-5 h-5" />
      {CATEGORIES[category].name}
    </h3>
  );
};

const CategoryCard = ({
  category,
  icon: Icon,
  isActive,
  onClick,
  description,
}) => (
  <button
    onClick={onClick}
    className={`w-full p-4 rounded-lg border-2 transition-all ${
      isActive
        ? "border-orange-500 bg-orange-50"
        : "border-gray-200 hover:border-orange-300"
    }`}
  >
    <div className="flex items-center gap-3">
      <Icon
        className={`w-6 h-6 ${isActive ? "text-orange-500" : "text-gray-500"}`}
      />
      <div className="text-left">
        <h3
          className={`font-semibold ${
            isActive ? "text-orange-500" : "text-gray-700"
          }`}
        >
          {category}
        </h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  </button>
);

const RuleInput = ({ rule, value, onChange }) => {
  switch (rule.type) {
    case "number":
      return (
        <input
          type="number"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={rule.placeholder}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      );
    case "percentage":
      return (
        <div className="relative">
          <input
            type="number"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={rule.placeholder}
            min="0"
            max="100"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <span className="absolute right-3 top-2 text-gray-500">%</span>
        </div>
      );
    case "select":
      return (
        <select
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="">Sélectionnez une option</option>
          {rule.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    case "multiSelect":
      return (
        <select
          multiple
          value={value || []}
          onChange={(e) => {
            const values = Array.from(
              e.target.selectedOptions,
              (option) => option.value
            );
            onChange(values);
          }}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 h-32"
        >
          {rule.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    case "rangeNumber":
      return (
        <div className="flex gap-2">
          <input
            type="number"
            value={value?.min || ""}
            onChange={(e) => onChange({ ...value, min: e.target.value })}
            placeholder={rule.placeholderMin}
            className="w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="number"
            value={value?.max || ""}
            onChange={(e) => onChange({ ...value, max: e.target.value })}
            placeholder={rule.placeholderMax}
            className="w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      );
    case "dateRange":
      return (
        <div className="flex gap-2">
          <input
            type="date"
            value={value?.start || ""}
            onChange={(e) => onChange({ ...value, start: e.target.value })}
            className="w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="date"
            value={value?.end || ""}
            onChange={(e) => onChange({ ...value, end: e.target.value })}
            className="w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      );
    default:
      return null;
  }
};

const CreateCampaignForm = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [campaignData, setCampaignData] = useState({
    name: "",
    description: "",
    rules: {},
  });
  const rules = createRulesFromJson();

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleRuleChange = (category, ruleId, value) => {
    setCampaignData((prev) => ({
      ...prev,
      rules: {
        ...prev.rules,
        [category]: {
          ...prev.rules[category],
          [ruleId]: value,
        },
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Campaign Data:", campaignData);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="space-y-6">
        {/* Campaign Basic Info */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            Information de la campagne
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              value={campaignData.name}
              onChange={(e) =>
                setCampaignData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Nom de la campagne"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <textarea
              value={campaignData.description}
              onChange={(e) =>
                setCampaignData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Description de la campagne"
              className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Category Selection */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Type de campagne</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(CATEGORIES).map(
              ([key, { name, icon, description }]) => (
                <CategoryCard
                  key={key}
                  category={name}
                  icon={icon}
                  description={description}
                  isActive={selectedCategories.includes(key)}
                  onClick={() => toggleCategory(key)}
                />
              )
            )}
          </div>
        </div>

        {/* Rules Configuration */}
        {selectedCategories.map((category) => (
          <div key={category} className="space-y-4">
            <RuleCategoryHeader category={category} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rules[category].map((rule) => (
                <div key={rule.id} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {rule.name}
                  </label>
                  <RuleInput
                    rule={rule}
                    value={campaignData.rules[category]?.[rule.id]}
                    onChange={(value) =>
                      handleRuleChange(category, rule.id, value)
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
        >
          Créer la campagne
        </button>
      </div>
    </div>
  );
};

export default CreateCampaignForm;
