import '@testing-library/jest-dom';
import { fireEvent, renderHook, waitFor } from '@testing-library/react';
import useLocalStorage from '../src';

beforeEach(() => {
  localStorage.clear();
});

test('put given initial value to localStorage and return it as the default value', async () => {
  const { result } = renderHook(() => useLocalStorage('name', 'dogan'));

  const storageValue = localStorage.getItem('name');

  expect(result.current[0]).toBe('dogan');
  expect(storageValue).toBe('dogan');
});

test('return existing value from the storage as the default value', async () => {
  localStorage.setItem('name', 'dogan');

  const { result } = renderHook(() => useLocalStorage('name'));

  expect(result.current[0]).toBe('dogan');
});

test("return null as the default value if the given key doesn't exist in the storage", async () => {
  const { result } = renderHook(() => useLocalStorage('name'));

  expect(result.current[0]).toBe(null);
});

test('clear method should successfully remove the key from storage', async () => {
  localStorage.setItem('name', 'dogan');

  const { result: firstHook } = renderHook(() => useLocalStorage('name'));
  const { result: secondHook } = renderHook(() => useLocalStorage('name'));

  expect(firstHook.current[0]).toBe('dogan');

  await waitFor(() => firstHook.current[2]());

  expect(firstHook.current[0]).toBe(null);
  expect(secondHook.current[0]).toBe(null);
  expect(localStorage.getItem('name')).toBe(null);
});

test('sync state for the same key across different hook calls', async () => {
  const { result: firstHook } = renderHook(() => useLocalStorage('name', 'dogan'));
  const { result: secondHook } = renderHook(() => useLocalStorage('name'));

  expect(firstHook.current[0]).toBe('dogan');
  expect(secondHook.current[0]).toBe('dogan');

  await waitFor(() => firstHook.current[1]('test'));

  expect(secondHook.current[0]).toBe('test');
  expect(localStorage.getItem('name')).toBe('test');
});

test('successfully catch storage events', async () => {
  const { result } = renderHook(() => useLocalStorage('name', 'dogan'));

  expect(result.current[0]).toBe('dogan');

  fireEvent(
    window,
    new StorageEvent('storage', {
      storageArea: localStorage,
      newValue: 'newValue',
      key: 'name',
    }),
  );

  expect(result.current[0]).toBe('newValue');
});
