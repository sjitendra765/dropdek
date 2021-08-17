import { Company, Deck } from '@dropdeck/schema';
import { hasBeenUpdated } from "../deck/queries/hasBeenUpdated.js";

export const CompanyService = {

  getDecks: (id) => {
    const clause = {
      $and: [
        {
          company: id,
          "permissions.company": true,
        },
        hasBeenUpdated()
      ],
    };
    return Deck.find(clause)
      .populate("owner")
      .exec(null);
  },

  create: (data, userId) => (
    Company.create({ ...data, owner: userId, company: null })),

  update: (id, data) => (
    Company.findByIdAndUpdate(id, { $set: { ...data } }, { new: true })),

  get: (id) => (
    Company.findById(id)
      .populate("branding")
      .exec(null))
};
