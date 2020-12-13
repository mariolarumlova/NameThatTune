/**
 * Set localStorage
 */
export function setStore(name: string, content: any) {
  if (!name) return;
  if (typeof content !== "string") {
    content = JSON.stringify(content);
  }
  return window.localStorage.setItem(name, content);
}
/**
 * Get localStorage
 */
export function getStore(name: string) {
  if (!name) return;
  const result = window.localStorage.getItem(name);
  return result ? JSON.parse(result) : null;
}
/**
 * Clear localStorage
 */
export function removeItem(name: string) {
  if (!name) return;
  return window.localStorage.removeItem(name);
}
/**
 * Validate Email address
 */
export function isValidEmail(value: string) {
  return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,64}$/i.test(value)
    ? false
    : true;
}
