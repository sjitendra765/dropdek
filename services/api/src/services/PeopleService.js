import { Person } from '@dropdeck/schema';

export const PeopleService = {
  /**
   * Fetch a user by ID and return a promise.
   *
   * @param id user ID.
   */
  get: (id) => (
    Person.findById(id)
      .populate("company")
      .populate("branding")
      .select("-_internal") // don't return _internal metadata to the client
      .exec(null)),

  update: (id, data) => Person.findByIdAndUpdate(id, { $set: { ...data } }, { new: true }),

};
