import { NotFound, BadRequest } from 'fejl'
import { Patient } from '../Models/patientModel'
import { keyService } from '../Services/rsaService'

/**
 * Patient Controller.
 * Manages patient operations.
 */
export default class PatientController {
  async all() {
    return {
      status: 200,
      body: await Patient.find({}).exec()
    }
  }

  async get(id) {
    var patientExistant = await Patient.findById(id).exec()
    if (patientExistant) {
      return {
        status: 200,
        body: patientExistant
      }
    } else {
      throw new NotFound({
        err_code: 'PATIENT_NOT_FOUND',
        message: 'Patient not found in database'
      })
    }
  }

  async add(data, headers) {
    if (headers == null) {
      throw new BadRequest({
        err_code: 'FORMAT_ERROR',
        message: 'erreur headers'
      })
    }

    if (headers['explicite-token'] == null) {
      throw new BadRequest({
        err_code: 'FORMAT_ERROR',
        message: 'erreur headers'
      })
    }

    if (headers['explicite-token'].id == null) {
      throw new BadRequest({
        err_code: 'FORMAT_ERROR',
        message: 'erreur headers'
      })
    }

    let patient = new Patient({
      ...data,
      medecin: headers['explicite-token'].id
    })

    let error = await patient.validateSync()

    if (error) {
      throw new BadRequest({
        err_code: 'FORMAT_ERROR',
        errors: error.errors
      })
    }

    await patient.save()

    return {
      status: 201,
      body: patient
    }
  }

  async delete(id) {
    const result = await Patient.findByIdAndDelete(id).exec()
    if (result) {
      return {
        status: 200,
        message: 'Patient successfully deleted'
      }
    } else {
      throw new NotFound({
        err_code: 'PATIENT_NOT_FOUND',
        message: 'Patient not found in database'
      })
    }
  }

  async update(id, data, headers) {
    // Check headers presence
    if (!headers) {
      throw new BadRequest({
        err_code: 'FORMAT_ERROR',
        message: 'Header is required.'
      })
    }

    // Check for a specific header token, assuming your security implementation requires it
    if (!headers['explicite-token'] || !headers['explicite-token'].id) {
      throw new BadRequest({
        err_code: 'TOKEN_ERROR',
        message: 'Explicite-token missing or invalid in headers.'
      })
    }

    // Find and update the patient
    const updatedPatient = await Patient.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    }).exec()

    if (!updatedPatient) {
      throw new NotFound({
        err_code: 'PATIENT_NOT_FOUND',
        message: 'No patient found with the given ID.'
      })
    }

    return {
      status: 200,
      body: updatedPatient
    }
  }
}
