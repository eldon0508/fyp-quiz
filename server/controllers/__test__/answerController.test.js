const db = require("../../database");
const controller = require("../answerController");

const mockIndexDatas = [
  {
    id: 1,
    question_id: 1,
    answer_text: "Test answer text 1",
    rate: 100,
    best_answer: false,
    created_at: "2025-01-01 23:00:00+00",
    updated_at: "2025-01-01 23:00:00+00",
    deleted_at: null,
  },
  {
    id: 2,
    question_id: 1,
    answer_text: "Test answer text 2",
    rate: 0,
    best_answer: true,
    created_at: "2025-01-01 23:00:00+00",
    updated_at: "2025-01-01 23:00:00+00",
    deleted_at: null,
  },
  {
    id: 3,
    question_id: 1,
    answer_text: "Test answer text 3",
    rate: 30,
    best_answer: false,
    created_at: "2025-01-01 23:00:00+00",
    updated_at: "2025-01-01 23:00:00+00",
    deleted_at: null,
  },
  {
    id: 4,
    question_id: 1,
    answer_text: "Test answer text 4",
    rate: 70,
    best_answer: false,
    created_at: "2025-01-01 23:00:00+00",
    updated_at: "2025-01-01 23:00:00+00",
    deleted_at: null,
  },
];

describe("answerController index function, get all existing entries from the database", () => {
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  test("should return a 200 status and all datas from the database", async () => {
    db.query = jest.fn().mockResolvedValue(mockIndexDatas);

    await controller.index(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ data: mockIndexDatas });
    expect(db.query).toHaveBeenCalledWith(
      "SELECT a.*, q.question_text as question_name FROM answers a LEFT JOIN questions q ON a.question_id = q.id WHERE a.deleted_at IS NULL"
    );
  });
});

describe("answerController store function, store a new entry into the database", () => {
  let mockStoreEntry;
  let mockRequest;
  let mockResponse;
  let mockQueryResult;
  let consoleErrorSpy;

  beforeEach(() => {
    mockStoreEntry = {
      question_id: 2,
      answer_text: "Store test answer text",
      rate: 100,
      best_answer: false,
      created_at: "2025-01-01 23:00:00+00",
      updated_at: "2025-01-01 23:00:00+00",
      deleted_at: null,
    };
    mockRequest = { body: mockStoreEntry };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockQueryResult = { rowCount: 1 };
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  test("should return a 201 status and store the request into database", async () => {
    db.query = jest.fn().mockResolvedValue(mockQueryResult);

    await controller.store(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({ success: true });
    expect(db.query).toHaveBeenCalledWith(
      "INSERT INTO answers (question_id, answer_text, rate, best_answer, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6)",
      [
        mockStoreEntry.question_id,
        mockStoreEntry.answer_text,
        mockStoreEntry.rate,
        mockStoreEntry.best_answer,
        expect.any(String),
        expect.any(String),
      ]
    );
    expect(consoleErrorSpy).not.toHaveBeenCalledWith();
  });

  test("should return 500 status and json with success false", async () => {
    const mockError = new Error("Database error");
    db.query = jest.fn().mockRejectedValue(mockError);

    await controller.store(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ success: false });
    expect(consoleErrorSpy).toHaveBeenCalledWith("Answer insert error:", mockError);
  });
});

describe("answerController edit function, return a selected entry for editing from database", () => {
  let mockEditData;
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    mockEditData = [
      {
        id: 1,
        question_id: 1,
        answer_text: "Test answer text 1",
        rate: 100,
        best_answer: false,
        created_at: "2025-01-01 23:00:00+00",
        updated_at: "2025-01-01 23:00:00+00",
        deleted_at: null,
      },
    ];
    mockRequest = { params: { id: 1 } };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  test("should return a 200 status and data from the database", async () => {
    db.query = jest.fn().mockResolvedValue([mockEditData]);

    await controller.edit(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ data: mockEditData });
    expect(db.query).toHaveBeenCalledWith("SELECT * FROM answers WHERE id = $1", [1]);
  });
});

describe("answerController update function, update an existing entry in database", () => {
  let mockRequest;
  let mockResponse;
  let mockQueryResult;
  let consoleErrorSpy;

  beforeEach(() => {
    mockUpdateEntry = {
      id: 1,
      question_id: 2,
      answer_text: "Update test answer text",
      rate: 0,
      best_answer: true,
      created_at: "2025-01-01 23:00:00+00",
      updated_at: "2025-01-01 23:00:00+00",
      deleted_at: null,
    };
    mockRequest = {
      body: mockUpdateEntry,
      params: { id: "1" },
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockQueryResult = { rowCount: 1 };
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  test("should return a 200 status and store the data to database", async () => {
    db.query = jest.fn().mockResolvedValue(mockQueryResult);

    await controller.update(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ success: true });
    expect(db.query).toHaveBeenCalledWith(
      "UPDATE answers SET question_id = $1, answer_text = $2, rate = $3, best_answer = $4, updated_at = $5 WHERE id = $6",
      [
        mockUpdateEntry.question_id,
        mockUpdateEntry.answer_text,
        mockUpdateEntry.rate,
        mockUpdateEntry.best_answer,
        expect.any(String),
        mockRequest.params.id.toString(),
      ]
    );
    expect(consoleErrorSpy).not.toHaveBeenCalledWith();
  });

  test("should return 500 status and json with success false", async () => {
    const mockError = new Error("Database error");
    db.query = jest.fn().mockRejectedValue(mockError);

    await controller.update(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ success: false });
    expect(consoleErrorSpy).toHaveBeenCalledWith("Answer update error:", mockError);
  });
});

describe("answerController destroy function, soft-delete an existing entry in database", () => {
  let mockRequest;
  let mockResponse;
  let mockQueryResult;
  let consoleErrorSpy;

  beforeEach(() => {
    mockRequest = {
      params: { id: "1" },
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockQueryResult = { rowCount: 1 };
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  test("should return a 200 status and soft delete the data from database", async () => {
    db.query = jest.fn().mockResolvedValue(mockQueryResult);

    await controller.destroy(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ success: true });
    expect(db.query).toHaveBeenCalledWith("UPDATE answers SET deleted_at = $1 WHERE id = $2", [
      expect.any(String),
      mockRequest.params.id.toString(),
    ]);
    expect(consoleErrorSpy).not.toHaveBeenCalledWith();
  });

  test("should return 500 status and json with success false", async () => {
    const mockError = new Error("Database error");
    db.query = jest.fn().mockRejectedValue(mockError);

    await controller.destroy(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ success: false });
    expect(consoleErrorSpy).toHaveBeenCalledWith("Answer destroy error:", mockError);
  });
});
