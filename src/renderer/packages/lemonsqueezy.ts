// =============================================================================
// ASSISTENTE IT: All LemonSqueezy payment API calls have been disabled
// This file now returns safe default values without making external requests
// =============================================================================

type ActivateResponse =
  | {
      activated: true
      instance: { id: string }
      meta: {
        product_id: number
      }
    }
  | {
      activated: false
      error: string
      license_key?: {
        id: number
        status: string
        key: string
        activation_limit: number
        activation_usage: number
        created_at: string
        expires_at: any
      }
    }

export async function activateLicense(
  key: string,
  instanceName: string
): Promise<{
  valid: boolean
  instanceId: string
  error?: 'reached_activation_limit' | 'expired' | 'not_found'
}> {
  // DISABLED: No license activation through LemonSqueezy
  return { valid: false, instanceId: '', error: 'not_found' }
}

export async function deactivateLicense(key: string, instanceId: string) {
  // DISABLED: No license deactivation through LemonSqueezy
  return
}

type ValidateLicenseKeyResponse = {
  valid: boolean
}

export async function validateLicense(key: string, instanceId: string): Promise<ValidateLicenseKeyResponse> {
  // DISABLED: No license validation through LemonSqueezy
  return { valid: false }
}
