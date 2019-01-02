import fs from 'fs'
import moment from 'moment'
import models from '../../models'

// import {
//   cogniId,
//   hashPassword,
//   comparePassword,
//   verifyPassword,
//   breakCogniId,
//   oneTimeHash,
// } from '../../helpers/UsersHelper'
// import { uploader } from '../../helpers/UploaderHelper'
// import colleges from '../../utils/colleges'

require('dotenv').config()


exports.getBankDetails = (req, res) => {
     res.status(200).json({ message: 'Bank Details Fetched.' })

 }

exports.addJobDetails = (req, res) => {
     res.status(200).json({ message: 'addJobDetails Details Fetched.' })

 }

exports.addContact = (req, res) => {
     res.status(200).json({ message: 'addContact Details Fetched.' })

 }

exports.addJobStatus = (req, res) => {
     res.status(200).json({ message: 'addJobStatus Details Fetched.' })

 }

exports.addjobNote = (req, res) => {
     res.status(200).json({ message: 'addjobNote Details Fetched.' })

 }

exports.addjobDocument = (req, res) => {
     res.status(200).json({ message: 'addjobDocument Details Fetched.' })

 }

  
exports.getJobDetails = (req, res) => {
     res.status(200).json({ message: 'getJobDetails Details Fetched.' })

 }

exports.getContact = (req, res) => {
     res.status(200).json({ message: 'getContact Details Fetched.' })

 }

exports.getJobStatus = (req, res) => {
     res.status(200).json({ message: 'getJobStatus Details Fetched.' })

 }

exports.getjobNote = (req, res) => {
     res.status(200).json({ message: 'getjobNote Details Fetched.' })

 }

exports.getjobDocument = (req, res) => {
     res.status(200).json({ message: 'getjobDocument Details Fetched.' })

 }

  