import { fireEvent, render, screen } from '@testing-library/react';
import Header from '@/components/Header/Header';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter, useNavigate } from 'react-router';

// Mock de useRevalidator et useNavigate pour les tests
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: vi.fn(),
    useRevalidator: vi.fn(() => ({
      revalidate: vi.fn(),
      state: 'idle',
    })),
  };
});

describe('<Header>', () => {
  it('should render the header correctly', () => {
    const { container } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    expect(container.firstChild).toMatchInlineSnapshot(`
      <nav>
        <div
          class="flex justify-between gap-4"
        >
          <img
            alt="Logo"
            src="data:image/svg+xml,%3csvg%20width='309'%20height='83'%20viewBox='0%200%20309%2083'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M238.626%2075.3097C242.971%2075.6476%20247.3%2076.0015%20251.645%2076.3877V0H238.626V75.3097ZM29.3052%2046.962L12.3594%200H0V82.9839C4.32899%2082.3726%208.65799%2081.7773%2013.0192%2081.2142V36.0863L28.0821%2079.364C32.8134%2078.817%2037.5769%2078.2861%2042.3244%2077.8035V0H29.3052V46.962ZM54.8286%2076.5968C66.8178%2075.5028%2078.8714%2074.6019%2090.9732%2073.9101V61.0876C83.2486%2061.5381%2075.524%2062.069%2067.8477%2062.6643V43.2778C72.8848%2043.2295%2079.5312%2043.0686%2085.4212%2043.1491V30.3266C80.722%2030.3105%2073.1584%2030.391%2067.8477%2030.4553V12.9351H90.9732V0H54.8286V76.5968ZM99.3254%2012.9351H112.94V72.8804C117.269%2072.7195%20121.614%2072.5747%20125.959%2072.4621V12.9351H139.574V0H99.3254V12.9351ZM147.91%2072.1082H160.929V42.5216H178.567V29.6992H160.913V12.9351H184.232V0H147.91V72.1082ZM308.984%200H294.693L285.279%2021.8319L276.798%200H262.717L277.844%2039.0143L261.349%2077.2886C265.919%2077.7391%20270.474%2078.2057%20275.028%2078.7044L284.635%2056.4542L294.146%2080.9889C299.103%2081.6325%20304.043%2082.2921%20308.984%2083L309%2082.9839L292.054%2039.2878L308.984%200ZM205.587%200H192.584V72.7517C204.412%2073.1539%20216.192%2073.7492%20227.908%2074.5375V61.7151C220.489%2061.2163%20213.054%2060.798%20205.587%2060.4602V0Z'%20fill='%23E50914'/%3e%3c/svg%3e"
            width="100"
          />
          <button
            aria-expanded="false"
            class="button button--md button--primary"
            data-rac=""
            data-react-aria-pressable="true"
            data-slot="button"
            id="react-aria-_r_1_"
            tabindex="0"
            type="button"
          >
            <svg
              fill="none"
              height="16"
              viewBox="0 0 16 16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                d="M8 1.75a.75.75 0 0 1 .75.75v4.75h4.75a.75.75 0 0 1 0 1.5H8.75v4.75a.75.75 0 0 1-1.5 0V8.75H2.5a.75.75 0 0 1 0-1.5h4.75V2.5A.75.75 0 0 1 8 1.75"
                fill="currentColor"
                fill-rule="evenodd"
              />
            </svg>
            Ajouter un film
          </button>
        </div>
      </nav>
    `);
  });

  it('should render a button to add a movie', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    const button = screen.getByText('Ajouter un film');
    expect(button).toBeTruthy();
  });

  it('should open the drawer when the add movie button is clicked', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    const button = screen.getByText('Ajouter un film');
    fireEvent.click(button);

    const drawer = screen.getByRole('dialog');
    expect(drawer).toBeTruthy();
  });

  it('should navigate to home page when the logo is clicked', () => {
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    const logo = screen.getByAltText('Logo');
    fireEvent.click(logo);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
