import { useEffect, useState } from "react";
import Dropdeck from "../Dropdeck";

/**
 * Get all decks for a company.
 *
 * @param user
 * @returns {[*[], refetch, unknown]}
 */
const useCompanyDecks = (user) => {
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState(undefined);

  const refetch = () => {
    if (user.company !== undefined && user.company !== null) {
      Dropdeck.api.get(
        `companies/${user.company._id}/decks`,
        undefined,
      )
        .then((payload) => {
          setDecks(payload.data);
        })
        .catch((e) => setError(e));
    }
  };

  useEffect(() => {
    refetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return [decks, refetch, error];
};
export { useCompanyDecks };

/**
 * Create a new Company on the server.
 *
 * @returns {[(value: unknown) => void, {deck: *[], error: unknown}]}
 */
const useCreateCompany = () => {
  const [createCompany, setCreateCompany] = useState(undefined);
  const [company, setCompany] = useState(undefined);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    if (createCompany) {
      Dropdeck.Companies.create(createCompany)
        .then((payload) => {
          setCompany(payload.data);
        })
        .catch((e) => setError(e));
    }
  }, [createCompany]);

  return [setCreateCompany, {
    company,
    error
  }];
};
export { useCreateCompany };

/**
 * Update company values on the server.
 *
 * @returns {[(value: unknown) => void, {deck: *[], error: unknown}]}
 */
const useUpdateCompany = () => {
  const [updateCompany, setUpdateCompany] = useState(undefined);
  const [company, setCompany] = useState(undefined);
  const [error, setError] = useState(undefined);

  const setUpdate = (id, data) => {
    setUpdateCompany([id, data]);
  };

  useEffect(() => {
    if (updateCompany) {
      Dropdeck.Companies.update(updateCompany[0], updateCompany[1])
        .then((payload) => {
          setCompany(payload.data);
        })
        .catch((e) => setError(e));
    }
  }, [updateCompany]);

  return [setUpdate, {
    company,
    error
  }];
};
export { useUpdateCompany };

/**
 * Delete company by id.
 *
 * @returns {[(value: unknown) => void, {deck: *[], error: unknown}]}
 */
const useDeleteCompany = () => {
  const [deleteCompany, setDeleteCompany] = useState(undefined);
  const [status, setStatus] = useState(undefined);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    if (deleteCompany) {
      setStatus(undefined);
      Dropdeck.Companies.delete(deleteCompany)
        .then(() => {
          setStatus(true);
        })
        .catch((e) => setError(e));
    }
  }, [deleteCompany]);

  return [setDeleteCompany, status, error];
};
export { useDeleteCompany };
