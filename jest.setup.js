import '@testing-library/jest-dom';

// Existing mocks
global.Request = jest.fn().mockImplementation(() => ({
  json: jest.fn().mockResolvedValue({
    title: 'Test Task',
    description: 'Test Description',
    status: 'pending',
  }),
  nextUrl: {
    searchParams: new URLSearchParams({
      id: 'mock-id',
    }),
  },
}));

global.NextResponse = {
  json: jest.fn().mockReturnValue({}),
};
