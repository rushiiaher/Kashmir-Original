'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleAuthCallback = async () => {
      const supabase = createClient()
      
      const { data, error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('Error during auth callback:', error)
        router.push('/auth/login?error=verification_failed')
        return
      }

      if (data.session) {
        // User is verified and logged in
        router.push('/?verified=true')
      } else {
        // No session, redirect to login
        router.push('/auth/login')
      }
    }

    handleAuthCallback()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Verifying your account...</h2>
        <p className="text-gray-600">Please wait while we verify your email.</p>
      </div>
    </div>
  )
}