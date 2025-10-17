'use client'

import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from 'react'

// Input Component
interface NeuInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const NeuInput = forwardRef<HTMLInputElement, NeuInputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="neu-input-group">
        {label && (
          <label className="neu-input-label" htmlFor={props.id || props.name}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`neu-input ${error ? 'neu-input-error' : ''} ${className}`}
          {...props}
        />
        {error && (
          <span className="neu-input-error-text">{error}</span>
        )}
      </div>
    )
  }
)

NeuInput.displayName = 'NeuInput'

// Textarea Component
interface NeuTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const NeuTextarea = forwardRef<HTMLTextAreaElement, NeuTextareaProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="neu-input-group">
        {label && (
          <label className="neu-input-label" htmlFor={props.id || props.name}>
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`neu-textarea ${error ? 'neu-input-error' : ''} ${className}`}
          {...props}
        />
        {error && (
          <span className="neu-input-error-text">{error}</span>
        )}
      </div>
    )
  }
)

NeuTextarea.displayName = 'NeuTextarea'

// Checkbox Component
interface NeuCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export const NeuCheckbox = forwardRef<HTMLInputElement, NeuCheckboxProps>(
  ({ label, className = '', id, ...props }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`

    return (
      <label htmlFor={checkboxId} className={`neu-checkbox-wrapper ${className}`}>
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          className="neu-checkbox-input"
          {...props}
        />
        <span className="neu-checkbox-box" />
        <span className="neu-checkbox-label">{label}</span>
      </label>
    )
  }
)

NeuCheckbox.displayName = 'NeuCheckbox'

// Select Component
interface NeuSelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
}

export const NeuSelect = forwardRef<HTMLSelectElement, NeuSelectProps>(
  ({ label, error, options, className = '', ...props }, ref) => {
    return (
      <div className="neu-input-group">
        {label && (
          <label className="neu-input-label" htmlFor={props.id || props.name}>
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={`neu-select ${error ? 'neu-input-error' : ''} ${className}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <span className="neu-input-error-text">{error}</span>
        )}
      </div>
    )
  }
)

NeuSelect.displayName = 'NeuSelect'
