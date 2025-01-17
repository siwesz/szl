import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import IntroQuiz from './IntroQuiz';

// Create mock functions
const mockGetUser = vi.fn();
const mockUpload = vi.fn();
const mockUpdate = vi.fn();
const mockInsert = vi.fn();

// Mock modules before tests
vi.mock('../supabaseClient', () => ({
  supabase: {
    auth: {
      getUser: mockGetUser
    },
    storage: {
      from: () => ({
        upload: mockUpload
      })
    },
    from: () => ({
      insert: mockInsert,
      update: mockUpdate,
      eq: () => ({ update: mockUpdate })
    })
  }
}));

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => vi.fn()
}));

vi.mock('../utils/fileUpload', () => ({
  dataURLtoBlob: vi.fn().mockResolvedValue(new Blob()),
  validateImageFile: vi.fn(),
  getFileExtension: vi.fn().mockReturnValue('jpg')
}));

describe('IntroQuiz Integration Tests', () => {
  beforeEach(() => {
    // Reset all mocks
    vi.clearAllMocks();
    
    // Set up default successful responses
    mockGetUser.mockResolvedValue({
      data: { user: { id: 'test-id', email: 'test@example.com' } },
      error: null
    });
    mockUpload.mockResolvedValue({ data: { path: 'test-path' }, error: null });
    mockUpdate.mockResolvedValue({ error: null });
    mockInsert.mockResolvedValue({ error: null });
  });

  it('should complete full quiz flow and save to Supabase', async () => {
    render(
      <MemoryRouter>
        <IntroQuiz />
      </MemoryRouter>
    );

    // Complete the quiz
    await waitFor(() => {
      fireEvent.click(screen.getByText('Slim'));
    });

    // Upload profile picture
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const fileInput = screen.getByLabelText(/profile picture/i);
    await userEvent.upload(fileInput, file);

    // Submit form
    const submitButton = screen.getByText(/complete profile/i);
    await userEvent.click(submitButton);

    // Verify Supabase calls
    await waitFor(() => {
      expect(mockGetUser).toHaveBeenCalled();
      expect(mockUpload).toHaveBeenCalled();
      expect(mockUpdate).toHaveBeenCalled();
    });
  });

  it('should handle missing profile picture error', async () => {
    render(
      <MemoryRouter>
        <IntroQuiz />
      </MemoryRouter>
    );

    // Try to submit without profile picture
    const submitButton = screen.getByText(/complete profile/i);
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/please upload a profile picture/i)).toBeInTheDocument();
    });
  });

  it('should handle authentication error', async () => {
    // Setup auth error
    mockGetUser.mockResolvedValueOnce({
      data: { user: null },
      error: new Error('Auth error')
    });

    render(
      <MemoryRouter>
        <IntroQuiz />
      </MemoryRouter>
    );

    // Try to submit
    const submitButton = screen.getByText(/complete profile/i);
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/please sign in again/i)).toBeInTheDocument();
    });
  });
});