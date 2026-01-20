export const isValidTransition = (from, to) => {
  const transitions = {
    PENDING: ["ASSIGNED", "CANCELLED"],
    ASSIGNED: ["IN_PROGRESS", "CANCELLED", "FAILED"],
    IN_PROGRESS: ["COMPLETED"],
  };

  return transitions[from]?.includes(to);
};
