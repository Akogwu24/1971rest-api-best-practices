const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const generateRandomAlphaNumericCode = ({ codeLength = 4 }: { codeLength: number }) => {
  let result = '';
  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
};

type TPaginationInformation = {
  page: number;
  totalDocuments: number;
  limit: number;
  totalPages: number;
};

export const paginationInformation = ({ page, totalDocuments, limit, totalPages }: TPaginationInformation) => {
  return {
    currentPage: page,
    totalPages,
    totalItems: totalDocuments,
    itemsPerPage: limit,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
    nextPage: page < totalPages ? page + 1 : null,
    previousPage: page > 1 ? page - 1 : null,
  };
};
