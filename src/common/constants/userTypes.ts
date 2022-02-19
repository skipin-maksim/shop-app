import { createArrayFromObject } from "../../helpers/arrayHelpers";

export const userTypes = {
  OWNER: "owner",
  ADMIN: "admin",
  SUPER_CLIENT: "super-client",
  CLIENT: "client",
};

export const userTypesArray = createArrayFromObject(userTypes);
