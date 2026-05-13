import { orgData } from "../data/orgData.js";
import {
  buildOrganizationSchema,
  buildPrimaryLocationSchema,
  buildWebsiteSchema,
} from "../builders/buildOrganizationSchema.js";
import {
  ORGANIZATION_ID,
  PRIMARY_LOCATION_ID,
  WEBSITE_ID,
} from "../constants/ids.js";

export { ORGANIZATION_ID, PRIMARY_LOCATION_ID, WEBSITE_ID };

export const organizationSchema = buildOrganizationSchema(orgData);
export const websiteSchema = buildWebsiteSchema(orgData);
export const primaryLocationSchema = buildPrimaryLocationSchema(orgData);
