import axios from 'axios';

/**
 * Downloads the PDF invoice for a specific order.
 * @param {string} orderId - The order ID.
 * @param {string} serverUrl - The backend base URL.
 * @returns {Promise<{ success: boolean, message?: string }>}
 */
export async function downloadOrderInvoice(orderId, serverUrl) {
  try {
    const response = await axios.get(
      `${serverUrl}/api/order/${orderId}/invoice`,
      {
        withCredentials: true,
        responseType: 'blob'
      }
    );

    // Extract filename from Content-Disposition header if available
    let filename = `ShopIn-Invoice-${orderId.slice(-8).toUpperCase()}.pdf`;
    const disposition = response.headers['content-disposition'] || response.headers['Content-Disposition'];
    if (disposition && disposition.includes('filename=')) {
      const match = disposition.match(/filename=["']?([^"']+)["']?/);
      if (match && match[1]) {
        filename = match[1];
      }
    }

    // Create a Blob from response data and trigger download
    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    return { success: true };
  } catch (err) {
    let message = 'Failed to download invoice. Please try again.';

    // If server returned a JSON error response inside a Blob
    if (err.response && err.response.data instanceof Blob) {
      try {
        const text = await err.response.data.text();
        const json = JSON.parse(text);
        if (json.message) message = json.message;
      } catch {
        // Fallback to default message
      }
    } else if (err.response?.data?.message) {
      message = err.response.data.message;
    } else if (err.message) {
      message = err.message;
    }

    return { success: false, message };
  }
}
