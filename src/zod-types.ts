import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const LoginDto = z
  .object({ email: z.string(), password: z.string() })
  .passthrough();
const RefreshTokenDto = z.object({ refreshToken: z.string() }).passthrough();
const CreateUserDto = z
  .object({
    email: z.string(),
    password: z.string(),
    name: z.string(),
    username: z.string().optional(),
    role: z.enum(["USER", "ADMIN"]).optional().default("USER"),
    preferences: z.object({}).partial().passthrough().optional(),
    companyId: z.number().optional().default(1),
    isActive: z.boolean().optional().default(true),
  })
  .passthrough();
const UpdateUserDto = z
  .object({
    email: z.string(),
    password: z.string(),
    name: z.string(),
    username: z.string(),
    role: z.enum(["USER", "ADMIN"]).default("USER"),
    preferences: z.object({}).partial().passthrough(),
    companyId: z.number().default(1),
    isActive: z.boolean().default(true),
    deletedAt: z.string(),
  })
  .partial()
  .passthrough();
const AddressDto = z
  .object({
    id: z.number().optional(),
    street: z.string().optional(),
    number: z.string().optional(),
    floor: z.string().optional(),
    apartment: z.string().optional(),
    neighborhood: z.string().optional(),
    reference: z.string().optional(),
    cityId: z.number(),
  })
  .passthrough();
const CreateCompanyDto = z
  .object({
    cuit: z.string(),
    name: z.string(),
    businessName: z.string().optional(),
    information: z.string().optional(),
    businessCategoryId: z.number().optional(),
    address: AddressDto.optional(),
  })
  .passthrough();
const UpdateCompanyDto = z
  .object({
    cuit: z.string(),
    name: z.string(),
    businessName: z.string(),
    information: z.string(),
    businessCategoryId: z.number(),
    address: AddressDto,
  })
  .partial()
  .passthrough();
const CreateBusinessCategoryDto = z
  .object({
    name: z.string(),
    code: z.string().optional(),
    information: z.string().optional(),
  })
  .passthrough();
const UpdateBusinessCategoryDto = z
  .object({ name: z.string(), code: z.string(), information: z.string() })
  .partial()
  .passthrough();
const CreateBusinessSubCategoryDto = z
  .object({
    name: z.string(),
    description: z.string().optional(),
    businessCategoryId: z.number(),
  })
  .passthrough();
const UpdateBusinessSubCategoryDto = z
  .object({
    name: z.string(),
    description: z.string(),
    businessCategoryId: z.number(),
  })
  .partial()
  .passthrough();
const CreateContactDto = z
  .object({
    type: z.enum([
      "EMAIL",
      "PHONE",
      "WHATSAPP",
      "TELEGRAM",
      "INSTAGRAM",
      "LINKEDIN",
      "OTHER",
    ]),
    value: z.string(),
    label: z.string().optional(),
    information: z.string().optional(),
    companyId: z.number().optional(),
    personId: z.number().optional(),
  })
  .passthrough();
const UpdateContactDto = z
  .object({
    type: z.enum([
      "EMAIL",
      "PHONE",
      "WHATSAPP",
      "TELEGRAM",
      "INSTAGRAM",
      "LINKEDIN",
      "OTHER",
    ]),
    value: z.string(),
    label: z.string(),
    information: z.string(),
    companyId: z.number(),
    personId: z.number(),
  })
  .partial()
  .passthrough();
const CreateEquipmentAxleDto = z
  .object({
    equipmentId: z.number(),
    order: z.number(),
    axleType: z.enum(["FRONT", "DRIVE", "TRAILER", "TAG"]),
    wheelCount: z.number(),
    description: z.string().optional(),
  })
  .passthrough();
const CreateTirePositionDto = z
  .object({
    axleId: z.number(),
    positionKey: z.string(),
    side: z.enum(["LEFT", "RIGHT", "INNER", "OUTER"]),
    isDual: z.boolean(),
  })
  .passthrough();
const CreateEquipmentAxleWithPositionsDto = z
  .object({
    axle: CreateEquipmentAxleDto,
    positions: z.array(CreateTirePositionDto),
  })
  .passthrough();
const UpdateEquipmentAxleDto = z
  .object({
    equipmentId: z.number(),
    order: z.number(),
    axleType: z.enum(["FRONT", "DRIVE", "TRAILER", "TAG"]),
    wheelCount: z.number(),
    description: z.string(),
  })
  .partial()
  .passthrough();
const CreateEquipmentCategoryDto = z
  .object({
    name: z.string(),
    code: z.string().optional(),
    description: z.string().optional(),
  })
  .passthrough();
const UpdateEquipmentCategoryDto = z
  .object({ name: z.string(), code: z.string(), description: z.string() })
  .partial()
  .passthrough();
const CreateEquipmentTypeDto = z
  .object({
    name: z.string(),
    code: z.string().optional(),
    description: z.string().optional(),
    categoryId: z.number().optional(),
  })
  .passthrough();
const UpdateEquipmentTypeDto = z
  .object({
    name: z.string(),
    code: z.string(),
    description: z.string(),
    categoryId: z.number(),
  })
  .partial()
  .passthrough();
const CreateEquipmentModelDto = z
  .object({
    name: z.string(),
    code: z.string().optional(),
    year: z.number().optional(),
    description: z.string().optional(),
    typeId: z.number().optional(),
    brandId: z.number().optional(),
  })
  .passthrough();
const UpdateEquipmentModelDto = z
  .object({
    name: z.string(),
    code: z.string(),
    year: z.number(),
    description: z.string(),
    typeId: z.number(),
    brandId: z.number(),
  })
  .partial()
  .passthrough();
const CreateEquipmentDto = z
  .object({
    internalCode: z.string(),
    name: z.string(),
    description: z.string(),
    observation: z.string(),
    year: z.number(),
    licensePlate: z.string(),
    chassis: z.string(),
    engine: z.string(),
    color: z.string(),
    diesel: z.boolean(),
    status: z
      .enum(["ACTIVE", "INACTIVE", "MAINTENANCE", "RETIRED"])
      .default("ACTIVE"),
    companyId: z.number(),
    categoryId: z.number(),
    typeId: z.number(),
    modelId: z.number(),
  })
  .partial()
  .passthrough();
const UpdateEquipmentDto = z
  .object({
    internalCode: z.string(),
    name: z.string(),
    description: z.string(),
    observation: z.string(),
    year: z.number(),
    licensePlate: z.string(),
    chassis: z.string(),
    engine: z.string(),
    color: z.string(),
    diesel: z.boolean(),
    status: z
      .enum(["ACTIVE", "INACTIVE", "MAINTENANCE", "RETIRED"])
      .default("ACTIVE"),
    companyId: z.number(),
    categoryId: z.number(),
    typeId: z.number(),
    modelId: z.number(),
  })
  .partial()
  .passthrough();
const CreateEmployeeDto = z
  .object({
    employeeCode: z.string().optional(),
    information: z.string().optional(),
    status: z.enum(["ACTIVE", "SUSPENDED", "TERMINATED"]).default("ACTIVE"),
    hireDate: z.string(),
    endDate: z.string().optional(),
    companyId: z.number().optional(),
    categoryId: z.number(),
    positionId: z.number(),
    personId: z.number(),
  })
  .passthrough();
const UpdateEmployeeDto = z
  .object({
    employeeCode: z.string(),
    information: z.string(),
    status: z.enum(["ACTIVE", "SUSPENDED", "TERMINATED"]).default("ACTIVE"),
    hireDate: z.string(),
    endDate: z.string(),
    companyId: z.number(),
    categoryId: z.number(),
    positionId: z.number(),
    personId: z.number(),
  })
  .partial()
  .passthrough();
const CreateEmployeeIncidentDto = z.object({}).partial().passthrough();
const UpdateEmployeeIncidentDto = z.object({}).partial().passthrough();
const CreateEquipmentMaintenanceDto = z.object({}).partial().passthrough();
const CreateEmployeeVacationDto = z
  .object({
    detail: z.string().optional(),
    days: z.number(),
    year: z.number().optional(),
    startDate: z.string(),
    type: z.enum(["ASSIGNED", "TAKEN"]).optional(),
    settlementDate: z.string().optional(),
    employeeId: z.number(),
  })
  .passthrough();
const UpdateEmployeeVacationDto = z
  .object({
    detail: z.string(),
    days: z.number(),
    year: z.number(),
    startDate: z.string(),
    type: z.enum(["ASSIGNED", "TAKEN"]),
  })
  .partial()
  .passthrough();
const CreateEmployeePositionDto = z
  .object({
    name: z.string(),
    code: z.string().optional(),
    information: z.string().optional(),
    isActive: z.boolean().optional(),
  })
  .passthrough();
const UpdateEmployeePositionDto = z
  .object({
    name: z.string(),
    code: z.string(),
    information: z.string(),
    isActive: z.boolean(),
  })
  .partial()
  .passthrough();
const CreateEmployeeCategoryDto = z
  .object({
    name: z.string(),
    code: z.string().optional(),
    information: z.string().optional(),
    isActive: z.boolean().optional(),
  })
  .passthrough();
const UpdateEmployeeCategoryDto = z
  .object({
    name: z.string(),
    code: z.string(),
    information: z.string(),
    isActive: z.boolean(),
  })
  .partial()
  .passthrough();
const CreateAddressDto = z
  .object({
    street: z.string().max(150).optional(),
    number: z.string().max(10).optional(),
    floor: z.string().max(10).optional(),
    apartment: z.string().max(10).optional(),
    neighborhood: z.string().max(100).optional(),
    reference: z.string().max(255).optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    isActive: z.boolean().optional().default(true),
    cityId: z.number(),
    personId: z.number().optional(),
    companyId: z.number().optional(),
  })
  .passthrough();
const UpdateAddressDto = z
  .object({
    street: z.string().max(150),
    number: z.string().max(10),
    floor: z.string().max(10),
    apartment: z.string().max(10),
    neighborhood: z.string().max(100),
    reference: z.string().max(255),
    latitude: z.number(),
    longitude: z.number(),
    isActive: z.boolean().default(true),
    cityId: z.number(),
    personId: z.number(),
    companyId: z.number(),
  })
  .partial()
  .passthrough();
const CreateCityDto = z
  .object({
    name: z.string().max(100),
    postalCode: z.string().max(20),
    provinceId: z.number(),
  })
  .passthrough();
const UpdateCityDto = z
  .object({
    name: z.string().max(100),
    postalCode: z.string().max(20),
    provinceId: z.number(),
  })
  .partial()
  .passthrough();
const CreateCountryDto = z
  .object({ name: z.string(), code: z.string() })
  .passthrough();
const UpdateCountryDto = z
  .object({ name: z.string(), code: z.string() })
  .partial()
  .passthrough();
const CreateProvinceDto = z
  .object({ code: z.string().max(10), name: z.string().max(100) })
  .passthrough();
const UpdateProvinceDto = z
  .object({ code: z.string().max(10), name: z.string().max(100) })
  .partial()
  .passthrough();
const CreateBrandDto = z.object({}).partial().passthrough();
const UpdateBrandDto = z.object({}).partial().passthrough();
const CreateUnitDto = z.object({}).partial().passthrough();
const UpdateUnitDto = z.object({}).partial().passthrough();
const CreatePersonDto = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    birthDate: z.string().optional(),
    dni: z.string().optional(),
    cuil: z.string().optional(),
    gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
    maritalStatus: z
      .enum(["SINGLE", "MARRIED", "DIVORCED", "WIDOWED"])
      .optional(),
    information: z.string().optional(),
    status: z.enum(["ACTIVE", "INACTIVE"]).optional().default("ACTIVE"),
  })
  .passthrough();
const UpdatePersonDto = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    birthDate: z.string(),
    dni: z.string(),
    cuil: z.string(),
    gender: z.enum(["MALE", "FEMALE", "OTHER"]),
    maritalStatus: z.enum(["SINGLE", "MARRIED", "DIVORCED", "WIDOWED"]),
    information: z.string(),
    status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
  })
  .partial()
  .passthrough();
const CreateFamilyDto = z
  .object({
    relationship: z.string(),
    personId: z.number(),
    relativeId: z.number(),
  })
  .passthrough();
const UpdateFamilyDto = z
  .object({
    relationship: z.string(),
    personId: z.number(),
    relativeId: z.number(),
  })
  .partial()
  .passthrough();
const DocumentsController_uploadFile_Body = z
  .object({
    file: z.instanceof(File),
    description: z.string().optional(),
    employeeId: z.number().int().gte(1).optional(),
    companyId: z.number().int().gte(1).optional(),
  })
  .passthrough();
const CreateDocumentDto = z.object({}).partial().passthrough();
const UpdateDocumentDto = z.object({}).partial().passthrough();
const CreateTireSizeDto = z
  .object({
    mainCode: z.string(),
    width: z.number().optional(),
    aspectRatio: z.number().optional(),
    rimDiameter: z.number().optional(),
    construction: z.string().optional(),
    loadIndex: z.number().optional(),
    speedSymbol: z.string().optional(),
    information: z.string().optional(),
  })
  .passthrough();
const UpdateTireSizeDto = z
  .object({
    mainCode: z.string(),
    width: z.number(),
    aspectRatio: z.number(),
    rimDiameter: z.number(),
    construction: z.string(),
    loadIndex: z.number(),
    speedSymbol: z.string(),
    information: z.string(),
  })
  .partial()
  .passthrough();
const CreateTireModelDto = z
  .object({
    brandId: z.number(),
    sizeId: z.number(),
    name: z.string(),
    loadIndex: z.number().optional(),
    speedSymbol: z.string().optional(),
    plyRating: z.string().optional(),
    treadPattern: z.string().optional(),
    information: z.string().optional(),
  })
  .passthrough();
const UpdateTireModelDto = z
  .object({
    brandId: z.number(),
    sizeId: z.number(),
    name: z.string(),
    loadIndex: z.number(),
    speedSymbol: z.string(),
    plyRating: z.string(),
    treadPattern: z.string(),
    information: z.string(),
  })
  .partial()
  .passthrough();
const MountTireDto = z
  .object({
    tireId: z.number(),
    positionConfigId: z.number(),
    kmAtStart: z.number().optional(),
    mountDate: z.string().optional(),
    note: z.string().optional(),
    equipmentId: z.number().optional(),
    position: z.string().optional(),
  })
  .passthrough();
const UnmountTireDto = z
  .object({
    assignmentId: z.number(),
    kmAtEnd: z.number().optional(),
    unmountDate: z.string().optional(),
    newStatus: z
      .enum(["IN_STOCK", "UNDER_REPAIR", "RECAP", "DISCARDED"])
      .optional(),
    note: z.string().optional(),
  })
  .passthrough();
const CreateTireRotationDto = z
  .object({
    tireId: z.number(),
    fromEquipmentId: z.number().optional(),
    toEquipmentId: z.number().optional(),
    fromPosition: z
      .enum([
        "DI",
        "DD",
        "E1I",
        "E1D",
        "E2I",
        "E2D",
        "E3I",
        "E3D",
        "E4I",
        "E4D",
        "E1II",
        "E1ID",
        "E1DI",
        "E1DD",
        "E2II",
        "E2ID",
        "E2DI",
        "E2DD",
        "E3II",
        "E3ID",
        "E3DI",
        "E3DD",
        "E4II",
        "E4ID",
        "E4DI",
        "E4DD",
        "SPARE",
        "UNKNOWN",
      ])
      .optional(),
    toPosition: z
      .enum([
        "DI",
        "DD",
        "E1I",
        "E1D",
        "E2I",
        "E2D",
        "E3I",
        "E3D",
        "E4I",
        "E4D",
        "E1II",
        "E1ID",
        "E1DI",
        "E1DD",
        "E2II",
        "E2ID",
        "E2DI",
        "E2DD",
        "E3II",
        "E3ID",
        "E3DI",
        "E3DD",
        "E4II",
        "E4ID",
        "E4DI",
        "E4DD",
        "SPARE",
        "UNKNOWN",
      ])
      .optional(),
    rotationDate: z.string().datetime({ offset: true }).optional(),
    kmAtRotation: z.number().optional(),
    notes: z.string().optional(),
  })
  .passthrough();
const UpdateTireRotationDto = z.object({}).partial().passthrough();
const CreateTireRecapDto = z
  .object({
    tireId: z.number(),
    provider: z.string().optional(),
    notes: z.string().optional(),
    cost: z.number().optional(),
    kmAtRecap: z.number().optional(),
    recapType: z.string().optional(),
  })
  .passthrough();
const UpdateTireRecapDto = z
  .object({
    tireId: z.number(),
    provider: z.string(),
    notes: z.string(),
    cost: z.number(),
    kmAtRecap: z.number(),
    recapType: z.string(),
  })
  .partial()
  .passthrough();
const CreateTireInspectionDto = z
  .object({
    tireId: z.number(),
    inspectionDate: z.string().datetime({ offset: true }).optional(),
    pressure: z.number().optional(),
    treadDepth: z.number().optional(),
    observation: z.string().optional(),
  })
  .passthrough();
const UpdateTireInspectionDto = z.object({}).partial().passthrough();
const TireUsageReportDto = z
  .object({
    startDate: z.string().datetime({ offset: true }),
    endDate: z.string().datetime({ offset: true }),
    equipmentId: z.number().optional(),
  })
  .passthrough();
const CreateTireEventDto = z
  .object({
    tireId: z.number(),
    type: z.enum([
      "ASSIGNMENT",
      "UNASSIGNMENT",
      "ROTATION",
      "INSPECTION",
      "RECAP",
      "DISCARD",
      "OTHER",
    ]),
    description: z.string(),
    date: z.string().datetime({ offset: true }).optional(),
    kmAtEvent: z.number().optional(),
    data: z.object({}).partial().passthrough().optional(),
  })
  .passthrough();
const UpdateTirePositionDto = z
  .object({
    axleId: z.number(),
    positionKey: z.string(),
    side: z.enum(["LEFT", "RIGHT", "INNER", "OUTER"]),
    isDual: z.boolean(),
  })
  .partial()
  .passthrough();
const CreateTireDto = z
  .object({
    serialNumber: z.string(),
    modelId: z.number(),
    position: z
      .enum([
        "DI",
        "DD",
        "E1I",
        "E1D",
        "E2I",
        "E2D",
        "E3I",
        "E3D",
        "E4I",
        "E4D",
        "E1II",
        "E1ID",
        "E1DI",
        "E1DD",
        "E2II",
        "E2ID",
        "E2DI",
        "E2DD",
        "E3II",
        "E3ID",
        "E3DI",
        "E3DD",
        "E4II",
        "E4ID",
        "E4DI",
        "E4DD",
        "SPARE",
        "UNKNOWN",
      ])
      .optional(),
    status: z
      .enum(["IN_STOCK", "IN_USE", "UNDER_REPAIR", "RECAP", "DISCARDED"])
      .default("IN_STOCK"),
    totalKm: z.number().optional(),
  })
  .passthrough();
const UpdateTireDto = z
  .object({
    serialNumber: z.string(),
    modelId: z.number(),
    position: z.enum([
      "DI",
      "DD",
      "E1I",
      "E1D",
      "E2I",
      "E2D",
      "E3I",
      "E3D",
      "E4I",
      "E4D",
      "E1II",
      "E1ID",
      "E1DI",
      "E1DD",
      "E2II",
      "E2ID",
      "E2DI",
      "E2DD",
      "E3II",
      "E3ID",
      "E3DI",
      "E3DD",
      "E4II",
      "E4ID",
      "E4DI",
      "E4DD",
      "SPARE",
      "UNKNOWN",
    ]),
    status: z
      .enum(["IN_STOCK", "IN_USE", "UNDER_REPAIR", "RECAP", "DISCARDED"])
      .default("IN_STOCK"),
    totalKm: z.number(),
  })
  .partial()
  .passthrough();

export const schemas = {
  LoginDto,
  RefreshTokenDto,
  CreateUserDto,
  UpdateUserDto,
  AddressDto,
  CreateCompanyDto,
  UpdateCompanyDto,
  CreateBusinessCategoryDto,
  UpdateBusinessCategoryDto,
  CreateBusinessSubCategoryDto,
  UpdateBusinessSubCategoryDto,
  CreateContactDto,
  UpdateContactDto,
  CreateEquipmentAxleDto,
  CreateTirePositionDto,
  CreateEquipmentAxleWithPositionsDto,
  UpdateEquipmentAxleDto,
  CreateEquipmentCategoryDto,
  UpdateEquipmentCategoryDto,
  CreateEquipmentTypeDto,
  UpdateEquipmentTypeDto,
  CreateEquipmentModelDto,
  UpdateEquipmentModelDto,
  CreateEquipmentDto,
  UpdateEquipmentDto,
  CreateEmployeeDto,
  UpdateEmployeeDto,
  CreateEmployeeIncidentDto,
  UpdateEmployeeIncidentDto,
  CreateEquipmentMaintenanceDto,
  CreateEmployeeVacationDto,
  UpdateEmployeeVacationDto,
  CreateEmployeePositionDto,
  UpdateEmployeePositionDto,
  CreateEmployeeCategoryDto,
  UpdateEmployeeCategoryDto,
  CreateAddressDto,
  UpdateAddressDto,
  CreateCityDto,
  UpdateCityDto,
  CreateCountryDto,
  UpdateCountryDto,
  CreateProvinceDto,
  UpdateProvinceDto,
  CreateBrandDto,
  UpdateBrandDto,
  CreateUnitDto,
  UpdateUnitDto,
  CreatePersonDto,
  UpdatePersonDto,
  CreateFamilyDto,
  UpdateFamilyDto,
  DocumentsController_uploadFile_Body,
  CreateDocumentDto,
  UpdateDocumentDto,
  CreateTireSizeDto,
  UpdateTireSizeDto,
  CreateTireModelDto,
  UpdateTireModelDto,
  MountTireDto,
  UnmountTireDto,
  CreateTireRotationDto,
  UpdateTireRotationDto,
  CreateTireRecapDto,
  UpdateTireRecapDto,
  CreateTireInspectionDto,
  UpdateTireInspectionDto,
  TireUsageReportDto,
  CreateTireEventDto,
  UpdateTirePositionDto,
  CreateTireDto,
  UpdateTireDto,
};

const endpoints = makeApi([
  {
    method: "post",
    path: "/api/auth/login",
    alias: "AuthController_login",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: LoginDto,
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 401,
        description: `Unauthorized`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/api/auth/profile",
    alias: "AuthController_getProfile",
    requestFormat: "json",
    response: z.void(),
    errors: [
      {
        status: 401,
        description: `Unauthorized`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "post",
    path: "/api/auth/refresh",
    alias: "AuthController_refreshToken",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ refreshToken: z.string() }).passthrough(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 401,
        description: `Invalid refresh token`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "post",
    path: "/api/brands",
    alias: "BrandsController_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({}).partial().passthrough(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/brands",
    alias: "BrandsController_findAll",
    requestFormat: "json",
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/brands/:id",
    alias: "BrandsController_findOne",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number(),
      },
    ],
    response: z.void(),
  },
  {
    method: "patch",
    path: "/api/brands/:id",
    alias: "BrandsController_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({}).partial().passthrough(),
      },
      {
        name: "id",
        type: "Path",
        schema: z.number(),
      },
    ],
    response: z.void(),
  },
  {
    method: "delete",
    path: "/api/brands/:id",
    alias: "BrandsController_remove",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/companies",
    alias: "CompaniesController_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CreateCompanyDto,
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Bad request`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/api/companies",
    alias: "CompaniesController_findAll",
    requestFormat: "json",
    parameters: [
      {
        name: "page",
        type: "Query",
        schema: z.number().gte(1).optional(),
      },
      {
        name: "limit",
        type: "Query",
        schema: z.number().gte(1).lte(100).optional(),
      },
      {
        name: "q",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "sortBy",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "sortOrder",
        type: "Query",
        schema: z.enum(["asc", "desc"]).optional(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/companies/:id",
    alias: "CompaniesController_findOne",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 404,
        description: `Company not found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "patch",
    path: "/api/companies/:id",
    alias: "CompaniesController_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: UpdateCompanyDto,
      },
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 404,
        description: `Company not found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "delete",
    path: "/api/companies/:id",
    alias: "CompaniesController_remove",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 404,
        description: `Company not found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/api/companies/categories",
    alias: "BusinessCategoriesController_findAll",
    requestFormat: "json",
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/companies/categories",
    alias: "BusinessCategoriesController_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CreateBusinessCategoryDto,
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/companies/categories/:id",
    alias: "BusinessCategoriesController_findOne",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "patch",
    path: "/api/companies/categories/:id",
    alias: "BusinessCategoriesController_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: UpdateBusinessCategoryDto,
      },
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "delete",
    path: "/api/companies/categories/:id",
    alias: "BusinessCategoriesController_remove",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/companies/subcategories",
    alias: "BusinessSubcategoriesController_findAll",
    requestFormat: "json",
    parameters: [
      {
        name: "categoryId",
        type: "Query",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/companies/subcategories",
    alias: "BusinessSubcategoriesController_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CreateBusinessSubCategoryDto,
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/companies/subcategories/:id",
    alias: "BusinessSubcategoriesController_findOne",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "patch",
    path: "/api/companies/subcategories/:id",
    alias: "BusinessSubcategoriesController_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: UpdateBusinessSubCategoryDto,
      },
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "delete",
    path: "/api/companies/subcategories/:id",
    alias: "BusinessSubcategoriesController_remove",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/contacts",
    alias: "ContactsController_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CreateContactDto,
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Bad request`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/api/contacts",
    alias: "ContactsController_findAll",
    requestFormat: "json",
    parameters: [
      {
        name: "page",
        type: "Query",
        schema: z.number().optional().default(1),
      },
      {
        name: "limit",
        type: "Query",
        schema: z.number().optional().default(10),
      },
      {
        name: "q",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "status",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/contacts/:id",
    alias: "ContactsController_findOne",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 404,
        description: `Contact not found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "patch",
    path: "/api/contacts/:id",
    alias: "ContactsController_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: UpdateContactDto,
      },
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 404,
        description: `Contact not found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "delete",
    path: "/api/contacts/:id",
    alias: "ContactsController_remove",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 404,
        description: `Contact not found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/api/contacts/company/:companyId",
    alias: "ContactsController_findByCompany",
    requestFormat: "json",
    parameters: [
      {
        name: "companyId",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "page",
        type: "Query",
        schema: z.number().optional().default(1),
      },
      {
        name: "limit",
        type: "Query",
        schema: z.number().optional().default(10),
      },
      {
        name: "q",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "status",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/contacts/person/:personId",
    alias: "ContactsController_findByPerson",
    requestFormat: "json",
    parameters: [
      {
        name: "personId",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "page",
        type: "Query",
        schema: z.number().optional().default(1),
      },
      {
        name: "limit",
        type: "Query",
        schema: z.number().optional().default(10),
      },
      {
        name: "q",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "status",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/documents",
    alias: "DocumentsController_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({}).partial().passthrough(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/documents",
    alias: "DocumentsController_findAll",
    requestFormat: "json",
    parameters: [
      {
        name: "employeeId",
        type: "Query",
        schema: z.string(),
      },
      {
        name: "companyId",
        type: "Query",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/documents/:id",
    alias: "DocumentsController_findOne",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "put",
    path: "/api/documents/:id",
    alias: "DocumentsController_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({}).partial().passthrough(),
      },
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "delete",
    path: "/api/documents/:id",
    alias: "DocumentsController_remove",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/documents/:id/download",
    alias: "DocumentsController_download",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/documents/upload",
    alias: "DocumentsController_uploadFile",
    requestFormat: "form-data",
    parameters: [
      {
        name: "body",
        description: `Subida de archivo asociada a un empleado o una empresa (exactamente uno)`,
        type: "Body",
        schema: DocumentsController_uploadFile_Body,
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/employee-categories",
    alias: "EmployeeCategoriesController_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CreateEmployeeCategoryDto,
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/employee-categories",
    alias: "EmployeeCategoriesController_findAll",
    requestFormat: "json",
    parameters: [
      {
        name: "page",
        type: "Query",
        schema: z.number().optional().default(1),
      },
      {
        name: "limit",
        type: "Query",
        schema: z.number().optional().default(10),
      },
      {
        name: "q",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "status",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/employee-categories/:id",
    alias: "EmployeeCategoriesController_findOne",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "patch",
    path: "/api/employee-categories/:id",
    alias: "EmployeeCategoriesController_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: UpdateEmployeeCategoryDto,
      },
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "delete",
    path: "/api/employee-categories/:id",
    alias: "EmployeeCategoriesController_remove",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/employee-incidents",
    alias: "EmployeeIncidentController_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({}).partial().passthrough(),
      },
    ],
    response: z.void(),
  },
  {
    method: "patch",
    path: "/api/employee-incidents/:id",
    alias: "EmployeeIncidentController_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({}).partial().passthrough(),
      },
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "delete",
    path: "/api/employee-incidents/:id",
    alias: "EmployeeIncidentController_delete",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/employee-incidents/employee/:employeeId",
    alias: "EmployeeIncidentController_findByEmployee",
    requestFormat: "json",
    parameters: [
      {
        name: "employeeId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/employee-positions",
    alias: "EmployeePositionsController_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CreateEmployeePositionDto,
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/employee-positions",
    alias: "EmployeePositionsController_findAll",
    requestFormat: "json",
    parameters: [
      {
        name: "page",
        type: "Query",
        schema: z.number().optional().default(1),
      },
      {
        name: "limit",
        type: "Query",
        schema: z.number().optional().default(10),
      },
      {
        name: "q",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "status",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/employee-positions/:id",
    alias: "EmployeePositionsController_findOne",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "patch",
    path: "/api/employee-positions/:id",
    alias: "EmployeePositionsController_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: UpdateEmployeePositionDto,
      },
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "delete",
    path: "/api/employee-positions/:id",
    alias: "EmployeePositionsController_remove",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/employee-vacations",
    alias: "EmployeeVacationsController_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CreateEmployeeVacationDto,
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/employee-vacations",
    alias: "EmployeeVacationsController_findAll",
    requestFormat: "json",
    parameters: [
      {
        name: "page",
        type: "Query",
        schema: z.number().optional().default(1),
      },
      {
        name: "limit",
        type: "Query",
        schema: z.number().optional().default(10),
      },
      {
        name: "q",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "status",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/employee-vacations/:employeeId/exportVacations/excel",
    alias: "EmployeeVacationsController_exportExcel",
    requestFormat: "json",
    parameters: [
      {
        name: "employeeId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/employee-vacations/:id",
    alias: "EmployeeVacationsController_findOne",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "patch",
    path: "/api/employee-vacations/:id",
    alias: "EmployeeVacationsController_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: UpdateEmployeeVacationDto,
      },
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "delete",
    path: "/api/employee-vacations/:id",
    alias: "EmployeeVacationsController_remove",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/employee-vacations/:id/pdf",
    alias: "EmployeeVacationsController_downloadPdf",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/employee-vacations/exportEmployees/excel",
    alias: "EmployeeVacationsController_exportEmployeesExcel",
    requestFormat: "json",
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/employees",
    alias: "EmployeesController_findAll",
    requestFormat: "json",
    parameters: [
      {
        name: "page",
        type: "Query",
        schema: z.number().gte(1).optional(),
      },
      {
        name: "limit",
        type: "Query",
        schema: z.number().gte(1).lte(100).optional(),
      },
      {
        name: "q",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "sortBy",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "sortOrder",
        type: "Query",
        schema: z.enum(["asc", "desc"]).optional(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/employees",
    alias: "EmployeesController_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CreateEmployeeDto,
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/employees/:employeeId/history",
    alias: "HistoryLogController_getEmployeeHistory",
    requestFormat: "json",
    parameters: [
      {
        name: "employeeId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/employees/:employeeId/history/incidents",
    alias: "HistoryLogController_createIncident",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({}).partial().passthrough(),
      },
      {
        name: "employeeId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/employees/:id",
    alias: "EmployeesController_findOne",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "patch",
    path: "/api/employees/:id",
    alias: "EmployeesController_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: UpdateEmployeeDto,
      },
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "delete",
    path: "/api/employees/:id",
    alias: "EmployeesController_remove",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/equipment/:equipmentId/history/maintenance",
    alias: "EquipmentMaintenanceController_createMaintenance",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({}).partial().passthrough(),
      },
      {
        name: "equipmentId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/equipments",
    alias: "EquipmentController_create",
    description: `Creates a new equipment record with the provided details.`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        description: `Data required to create a new equipment record.`,
        type: "Body",
        schema: CreateEquipmentDto,
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Invalid request data.`,
        schema: z.void(),
      },
      {
        status: 403,
        description: `Forbidden.`,
        schema: z.void(),
      },
      {
        status: 500,
        description: `Internal server error.`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/api/equipments",
    alias: "EquipmentController_findAll",
    description: `Retrieves all equipment records with optional filters and pagination parameters.`,
    requestFormat: "json",
    parameters: [
      {
        name: "page",
        type: "Query",
        schema: z.number().gte(1).optional(),
      },
      {
        name: "limit",
        type: "Query",
        schema: z.number().gte(1).lte(100).optional(),
      },
      {
        name: "q",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "sortBy",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "sortOrder",
        type: "Query",
        schema: z.enum(["asc", "desc"]).optional(),
      },
      {
        name: "typeId",
        type: "Query",
        schema: z.number().optional(),
      },
      {
        name: "modelId",
        type: "Query",
        schema: z.number().optional(),
      },
      {
        name: "categoryId",
        type: "Query",
        schema: z.number().optional(),
      },
      {
        name: "year",
        type: "Query",
        schema: z.number().optional(),
      },
      {
        name: "take",
        type: "Query",
        schema: z.number().optional(),
      },
      {
        name: "skip",
        type: "Query",
        schema: z.number().optional(),
      },
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 500,
        description: `Internal server error.`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/api/equipments/:id",
    alias: "EquipmentController_findOne",
    description: `Retrieves a single equipment record along with its related entities.`,
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 404,
        description: `Equipment not found.`,
        schema: z.void(),
      },
      {
        status: 500,
        description: `Internal server error.`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "patch",
    path: "/api/equipments/:id",
    alias: "EquipmentController_update",
    description: `Updates an existing equipment record based on the provided ID and data.`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        description: `Fields to update in the equipment record.`,
        type: "Body",
        schema: UpdateEquipmentDto,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 403,
        description: `Forbidden.`,
        schema: z.void(),
      },
      {
        status: 404,
        description: `Equipment not found.`,
        schema: z.void(),
      },
      {
        status: 500,
        description: `Internal server error.`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "delete",
    path: "/api/equipments/:id",
    alias: "EquipmentController_remove",
    description: `Deletes an equipment record permanently based on its unique ID.`,
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 403,
        description: `Forbidden.`,
        schema: z.void(),
      },
      {
        status: 404,
        description: `Equipment not found.`,
        schema: z.void(),
      },
      {
        status: 500,
        description: `Internal server error.`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "post",
    path: "/api/equipments/axles",
    alias: "EquipmentAxlesController_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CreateEquipmentAxleDto,
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/equipments/axles",
    alias: "EquipmentAxlesController_findAll",
    requestFormat: "json",
    parameters: [
      {
        name: "equipmentId",
        type: "Query",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/equipments/axles/:id",
    alias: "EquipmentAxlesController_findOne",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "put",
    path: "/api/equipments/axles/:id",
    alias: "EquipmentAxlesController_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: UpdateEquipmentAxleDto,
      },
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "delete",
    path: "/api/equipments/axles/:id",
    alias: "EquipmentAxlesController_remove",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/equipments/axles/positions/equipment/:equipmentId",
    alias: "EquipmentAxlesController_findPositionsByEquipment",
    requestFormat: "json",
    parameters: [
      {
        name: "equipmentId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/equipments/axles/with-positions",
    alias: "EquipmentAxlesController_createWithPositions",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CreateEquipmentAxleWithPositionsDto,
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/equipments/categories",
    alias: "EquipmentCategoryController_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CreateEquipmentCategoryDto,
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 403,
        description: `Forbidden.`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/api/equipments/categories",
    alias: "EquipmentCategoryController_findAll",
    requestFormat: "json",
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/equipments/categories/:id",
    alias: "EquipmentController_findCategory",
    description: `Retrieves a single equipment category and its related types.`,
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 404,
        description: `Equipment category not found.`,
        schema: z.void(),
      },
      {
        status: 500,
        description: `Internal server error.`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "patch",
    path: "/api/equipments/categories/:id",
    alias: "EquipmentCategoryController_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: UpdateEquipmentCategoryDto,
      },
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 403,
        description: `Forbidden.`,
        schema: z.void(),
      },
      {
        status: 404,
        description: `Equipment category not found.`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "delete",
    path: "/api/equipments/categories/:id",
    alias: "EquipmentCategoryController_remove",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 403,
        description: `Forbidden.`,
        schema: z.void(),
      },
      {
        status: 404,
        description: `Equipment category not found.`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/api/equipments/categories/all",
    alias: "EquipmentController_findCategories",
    description: `Retrieves a list of all equipment categories available.`,
    requestFormat: "json",
    response: z.void(),
    errors: [
      {
        status: 500,
        description: `Internal server error.`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "post",
    path: "/api/equipments/models",
    alias: "EquipmentModelController_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CreateEquipmentModelDto,
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 403,
        description: `Forbidden.`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/api/equipments/models",
    alias: "EquipmentModelController_findAll",
    requestFormat: "json",
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/equipments/models/:id",
    alias: "EquipmentController_findModel",
    description: `Retrieves a single equipment model with its brand and type information.`,
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 404,
        description: `Equipment model not found.`,
        schema: z.void(),
      },
      {
        status: 500,
        description: `Internal server error.`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "patch",
    path: "/api/equipments/models/:id",
    alias: "EquipmentModelController_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: UpdateEquipmentModelDto,
      },
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 403,
        description: `Forbidden.`,
        schema: z.void(),
      },
      {
        status: 404,
        description: `Equipment model not found.`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "delete",
    path: "/api/equipments/models/:id",
    alias: "EquipmentModelController_remove",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 403,
        description: `Forbidden.`,
        schema: z.void(),
      },
      {
        status: 404,
        description: `Equipment model not found.`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/api/equipments/models/all",
    alias: "EquipmentController_findModels",
    description: `Retrieves all equipment models, optionally filtered by equipment type ID.`,
    requestFormat: "json",
    parameters: [
      {
        name: "typeId",
        type: "Query",
        schema: z.number().optional(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 500,
        description: `Internal server error.`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/api/equipments/models/type/:typeId",
    alias: "EquipmentModelController_findByType",
    requestFormat: "json",
    parameters: [
      {
        name: "typeId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/equipments/types",
    alias: "EquipmentTypeController_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CreateEquipmentTypeDto,
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 403,
        description: `Forbidden.`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/api/equipments/types",
    alias: "EquipmentTypeController_findAll",
    requestFormat: "json",
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/equipments/types/:id",
    alias: "EquipmentController_findType",
    description: `Retrieves a single equipment type and its related category.`,
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 404,
        description: `Equipment type not found.`,
        schema: z.void(),
      },
      {
        status: 500,
        description: `Internal server error.`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "patch",
    path: "/api/equipments/types/:id",
    alias: "EquipmentTypeController_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: UpdateEquipmentTypeDto,
      },
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 403,
        description: `Forbidden.`,
        schema: z.void(),
      },
      {
        status: 404,
        description: `Equipment type not found.`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "delete",
    path: "/api/equipments/types/:id",
    alias: "EquipmentTypeController_remove",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 403,
        description: `Forbidden.`,
        schema: z.void(),
      },
      {
        status: 404,
        description: `Equipment type not found.`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/api/equipments/types/all",
    alias: "EquipmentController_findTypes",
    description: `Retrieves all equipment types, optionally filtered by category ID.`,
    requestFormat: "json",
    parameters: [
      {
        name: "categoryId",
        type: "Query",
        schema: z.number().optional(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 500,
        description: `Internal server error.`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/api/equipments/types/category/:categoryId",
    alias: "EquipmentTypeController_findByCategory",
    requestFormat: "json",
    parameters: [
      {
        name: "categoryId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/family",
    alias: "FamilyController_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CreateFamilyDto,
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/family",
    alias: "FamilyController_findAll",
    requestFormat: "json",
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/family/:id",
    alias: "FamilyController_findOne",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "patch",
    path: "/api/family/:id",
    alias: "FamilyController_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: UpdateFamilyDto,
      },
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "delete",
    path: "/api/family/:id",
    alias: "FamilyController_remove",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/health",
    alias: "HealthController_check",
    requestFormat: "json",
    response: z
      .object({
        status: z.string(),
        timestamp: z.string(),
        service: z.string(),
        version: z.string(),
      })
      .partial()
      .passthrough(),
  },
  {
    method: "get",
    path: "/api/inspections",
    alias: "InspectionsController_findAll",
    requestFormat: "json",
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/inspections/:id",
    alias: "InspectionsController_findOne",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/inspections/types",
    alias: "InspectionsController_findInspectionTypes",
    requestFormat: "json",
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/locations/addresses",
    alias: "AddressesController_findAll",
    requestFormat: "json",
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/locations/addresses",
    alias: "AddressesController_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CreateAddressDto,
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/locations/addresses/:id",
    alias: "AddressesController_findOne",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "patch",
    path: "/api/locations/addresses/:id",
    alias: "AddressesController_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: UpdateAddressDto,
      },
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "delete",
    path: "/api/locations/addresses/:id",
    alias: "AddressesController_remove",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/locations/addresses/city/:cityId",
    alias: "AddressesController_byCity",
    requestFormat: "json",
    parameters: [
      {
        name: "cityId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/locations/addresses/company/:companyId",
    alias: "AddressesController_createForCompany",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CreateAddressDto,
      },
      {
        name: "companyId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/locations/addresses/company/:companyId",
    alias: "AddressesController_byCompany",
    requestFormat: "json",
    parameters: [
      {
        name: "companyId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/locations/addresses/person/:personId",
    alias: "AddressesController_createForPerson",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CreateAddressDto,
      },
      {
        name: "personId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/locations/addresses/person/:personId",
    alias: "AddressesController_byPerson",
    requestFormat: "json",
    parameters: [
      {
        name: "personId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/locations/cities",
    alias: "CitiesController_findAll",
    requestFormat: "json",
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/locations/cities",
    alias: "CitiesController_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CreateCityDto,
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/locations/cities/:id",
    alias: "CitiesController_findOne",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "patch",
    path: "/api/locations/cities/:id",
    alias: "CitiesController_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: UpdateCityDto,
      },
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "delete",
    path: "/api/locations/cities/:id",
    alias: "CitiesController_remove",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/locations/cities/postal-code/:postalCode",
    alias: "CitiesController_byPostalCode",
    requestFormat: "json",
    parameters: [
      {
        name: "postalCode",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/locations/cities/province/:provinceId",
    alias: "CitiesController_byProvince",
    requestFormat: "json",
    parameters: [
      {
        name: "provinceId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/locations/countries",
    alias: "CountriesController_findAll",
    requestFormat: "json",
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/locations/countries",
    alias: "CountriesController_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CreateCountryDto,
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/locations/countries/:id",
    alias: "CountriesController_findOne",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "patch",
    path: "/api/locations/countries/:id",
    alias: "CountriesController_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: UpdateCountryDto,
      },
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "delete",
    path: "/api/locations/countries/:id",
    alias: "CountriesController_remove",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/locations/countries/:id/provinces",
    alias: "CountriesController_provinces",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/locations/provinces",
    alias: "ProvincesController_findAll",
    requestFormat: "json",
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/locations/provinces",
    alias: "ProvincesController_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CreateProvinceDto,
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/locations/provinces/:id",
    alias: "ProvincesController_findOne",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "patch",
    path: "/api/locations/provinces/:id",
    alias: "ProvincesController_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: UpdateProvinceDto,
      },
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "delete",
    path: "/api/locations/provinces/:id",
    alias: "ProvincesController_remove",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/locations/provinces/code/:code",
    alias: "ProvincesController_byCode",
    requestFormat: "json",
    parameters: [
      {
        name: "code",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/locations/provinces/country/:countryId",
    alias: "ProvincesController_byCountry",
    requestFormat: "json",
    parameters: [
      {
        name: "countryId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/persons",
    alias: "PersonsController_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CreatePersonDto,
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/persons",
    alias: "PersonsController_findAll",
    requestFormat: "json",
    parameters: [
      {
        name: "page",
        type: "Query",
        schema: z.number().gte(1).optional(),
      },
      {
        name: "limit",
        type: "Query",
        schema: z.number().gte(1).lte(100).optional(),
      },
      {
        name: "q",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "sortBy",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "sortOrder",
        type: "Query",
        schema: z.enum(["asc", "desc"]).optional(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/persons/:id",
    alias: "PersonsController_findOne",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "patch",
    path: "/api/persons/:id",
    alias: "PersonsController_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: UpdatePersonDto,
      },
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "delete",
    path: "/api/persons/:id",
    alias: "PersonsController_remove",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/tires",
    alias: "TiresController_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CreateTireDto,
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/tires",
    alias: "TiresController_findAll",
    requestFormat: "json",
    parameters: [
      {
        name: "page",
        type: "Query",
        schema: z.number().gte(1).optional(),
      },
      {
        name: "limit",
        type: "Query",
        schema: z.number().gte(1).lte(100).optional(),
      },
      {
        name: "q",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "sortBy",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "sortOrder",
        type: "Query",
        schema: z.enum(["asc", "desc"]).optional(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/tires/:id",
    alias: "TiresController_findOne",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "put",
    path: "/api/tires/:id",
    alias: "TiresController_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: UpdateTireDto,
      },
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "delete",
    path: "/api/tires/:id",
    alias: "TiresController_remove",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/tires/assignments/mount",
    alias: "TireAssignmentsController_mount",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: MountTireDto,
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/tires/assignments/open",
    alias: "TireAssignmentsController_open",
    requestFormat: "json",
    parameters: [
      {
        name: "equipmentId",
        type: "Query",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/tires/assignments/tire/:tireId",
    alias: "TireAssignmentsController_history",
    requestFormat: "json",
    parameters: [
      {
        name: "tireId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "put",
    path: "/api/tires/assignments/unmount",
    alias: "TireAssignmentsController_unmount",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: UnmountTireDto,
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/tires/events",
    alias: "TireEventsController_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CreateTireEventDto,
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/tires/events",
    alias: "TireEventsController_findAll",
    requestFormat: "json",
    parameters: [
      {
        name: "page",
        type: "Query",
        schema: z.string(),
      },
      {
        name: "limit",
        type: "Query",
        schema: z.string(),
      },
      {
        name: "q",
        type: "Query",
        schema: z.string(),
      },
      {
        name: "eventType",
        type: "Query",
        schema: z.string(),
      },
      {
        name: "fromDate",
        type: "Query",
        schema: z.string(),
      },
      {
        name: "toDate",
        type: "Query",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/tires/events/:id",
    alias: "TireEventsController_findOne",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "delete",
    path: "/api/tires/events/:id",
    alias: "TireEventsController_remove",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/tires/inspections",
    alias: "TireInspectionsController_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CreateTireInspectionDto,
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/tires/inspections",
    alias: "TireInspectionsController_findAll",
    requestFormat: "json",
    parameters: [
      {
        name: "page",
        type: "Query",
        schema: z.string(),
      },
      {
        name: "limit",
        type: "Query",
        schema: z.string(),
      },
      {
        name: "q",
        type: "Query",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/tires/inspections/:id",
    alias: "TireInspectionsController_findOne",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "patch",
    path: "/api/tires/inspections/:id",
    alias: "TireInspectionsController_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({}).partial().passthrough(),
      },
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "delete",
    path: "/api/tires/inspections/:id",
    alias: "TireInspectionsController_remove",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/tires/models",
    alias: "TireModelsController_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CreateTireModelDto,
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/tires/models",
    alias: "TireModelsController_findAll",
    requestFormat: "json",
    parameters: [
      {
        name: "page",
        type: "Query",
        schema: z.string(),
      },
      {
        name: "limit",
        type: "Query",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/tires/models/:id",
    alias: "TireModelsController_findOne",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "put",
    path: "/api/tires/models/:id",
    alias: "TireModelsController_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: UpdateTireModelDto,
      },
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "delete",
    path: "/api/tires/models/:id",
    alias: "TireModelsController_remove",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/tires/positions",
    alias: "TirePositionsController_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CreateTirePositionDto,
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/tires/positions",
    alias: "TirePositionsController_findAll",
    requestFormat: "json",
    parameters: [
      {
        name: "axleId",
        type: "Query",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/tires/positions/:id",
    alias: "TirePositionsController_findOne",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "put",
    path: "/api/tires/positions/:id",
    alias: "TirePositionsController_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: UpdateTirePositionDto,
      },
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "delete",
    path: "/api/tires/positions/:id",
    alias: "TirePositionsController_remove",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/tires/recaps",
    alias: "TireRecapsController_create",
    description: `Creates a new tire recap record with automatic denormalization updates to the tire (recapCount, lastRecapAt, lastRecapId)`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CreateTireRecapDto,
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/tires/recaps",
    alias: "TireRecapsController_findAll",
    requestFormat: "json",
    response: z.void(),
  },
  {
    method: "put",
    path: "/api/tires/recaps/:id",
    alias: "TireRecapsController_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: UpdateTireRecapDto,
      },
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "delete",
    path: "/api/tires/recaps/:id",
    alias: "TireRecapsController_remove",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/tires/recaps/tire/:tireId",
    alias: "TireRecapsController_findByTire",
    requestFormat: "json",
    parameters: [
      {
        name: "tireId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/tires/reports/average-life",
    alias: "TireReportsController_getAverageLife",
    requestFormat: "json",
    parameters: [
      {
        name: "brand",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "fromDate",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "toDate",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "minKm",
        type: "Query",
        schema: z.number().optional(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/tires/reports/brand-ranking",
    alias: "TireReportsController_getBrandRanking",
    requestFormat: "json",
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/tires/reports/cost-per-km",
    alias: "TireReportsController_getCostPerKm",
    requestFormat: "json",
    parameters: [
      {
        name: "brand",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "fromDate",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "toDate",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "minKm",
        type: "Query",
        schema: z.number().optional(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/tires/reports/export/average-life",
    alias: "TireReportsController_exportAverageLife",
    requestFormat: "json",
    parameters: [
      {
        name: "brand",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "fromDate",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "toDate",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "minKm",
        type: "Query",
        schema: z.number().optional(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/tires/reports/export/brand-ranking",
    alias: "TireReportsController_exportBrandRanking",
    requestFormat: "json",
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/tires/reports/export/cost-per-km",
    alias: "TireReportsController_exportCostPerKm",
    requestFormat: "json",
    parameters: [
      {
        name: "brand",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "fromDate",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "toDate",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "minKm",
        type: "Query",
        schema: z.number().optional(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/tires/reports/export/yearly-recaps",
    alias: "TireReportsController_exportYearlyRecaps",
    requestFormat: "json",
    parameters: [
      {
        name: "year",
        type: "Query",
        schema: z.number(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/tires/reports/over-recap",
    alias: "TireReportsController_getOverRecapped",
    requestFormat: "json",
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/tires/reports/usage",
    alias: "TireReportsController_generateUsageReport",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: TireUsageReportDto,
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/tires/reports/yearly-recaps",
    alias: "TireReportsController_getYearlyRecap",
    requestFormat: "json",
    parameters: [
      {
        name: "year",
        type: "Query",
        schema: z.number(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/tires/rotations",
    alias: "TireRotationsController_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CreateTireRotationDto,
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/tires/rotations",
    alias: "TireRotationsController_findAll",
    requestFormat: "json",
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/tires/rotations/:id",
    alias: "TireRotationsController_findOne",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "patch",
    path: "/api/tires/rotations/:id",
    alias: "TireRotationsController_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({}).partial().passthrough(),
      },
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "delete",
    path: "/api/tires/rotations/:id",
    alias: "TireRotationsController_remove",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/tires/sizes",
    alias: "TireSizesController_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CreateTireSizeDto,
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/tires/sizes",
    alias: "TireSizesController_findAll",
    requestFormat: "json",
    parameters: [
      {
        name: "page",
        type: "Query",
        schema: z.string(),
      },
      {
        name: "limit",
        type: "Query",
        schema: z.string(),
      },
      {
        name: "query",
        type: "Query",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/tires/sizes/:id",
    alias: "TireSizesController_findOne",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "put",
    path: "/api/tires/sizes/:id",
    alias: "TireSizesController_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: UpdateTireSizeDto,
      },
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "delete",
    path: "/api/tires/sizes/:id",
    alias: "TireSizesController_remove",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/tires/sizes/:sizeId/aliases",
    alias: "TireSizesController_getAliases",
    requestFormat: "json",
    parameters: [
      {
        name: "sizeId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/units",
    alias: "UnitsController_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({}).partial().passthrough(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/units",
    alias: "UnitsController_findAll",
    requestFormat: "json",
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/units/:id",
    alias: "UnitsController_findOne",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number(),
      },
    ],
    response: z.void(),
  },
  {
    method: "patch",
    path: "/api/units/:id",
    alias: "UnitsController_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({}).partial().passthrough(),
      },
      {
        name: "id",
        type: "Path",
        schema: z.number(),
      },
    ],
    response: z.void(),
  },
  {
    method: "delete",
    path: "/api/units/:id",
    alias: "UnitsController_remove",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/users",
    alias: "UsersController_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CreateUserDto,
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Bad request`,
        schema: z.void(),
      },
      {
        status: 409,
        description: `Email already in use`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/api/users",
    alias: "UsersController_findAll",
    requestFormat: "json",
    parameters: [
      {
        name: "page",
        type: "Query",
        schema: z.number().gte(1).optional(),
      },
      {
        name: "limit",
        type: "Query",
        schema: z.number().gte(1).lte(100).optional(),
      },
      {
        name: "q",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "sortBy",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "sortOrder",
        type: "Query",
        schema: z.enum(["asc", "desc"]).optional(),
      },
      {
        name: "companyId",
        type: "Query",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/users/:id",
    alias: "UsersController_findOne",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 404,
        description: `User not found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "patch",
    path: "/api/users/:id",
    alias: "UsersController_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: UpdateUserDto,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 404,
        description: `User not found`,
        schema: z.void(),
      },
      {
        status: 409,
        description: `Email already in use`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "delete",
    path: "/api/users/:id",
    alias: "UsersController_remove",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 404,
        description: `User not found`,
        schema: z.void(),
      },
    ],
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
