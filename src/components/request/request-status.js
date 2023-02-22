import * as React from 'react';
import { useState } from 'react';
import {
    Box,
    Stepper,
    Step,
    StepLabel,
    Button,
    Typography,
    Modal,
    TextField
} from '@mui/material';
import { useFormik } from 'formik';
import { requestUpdate } from '../../api/request';
import { useAlertContext } from '../../contexts/alert';
import { useFile } from '../../hooks/file';
import { getDatasUser } from '../../api/masterData';
import SelectAsync from '../select-async';
import FileDropzone from '../file-dropzone';
import * as Yup from 'yup';

const steps = ['Open', 'Review', 'Final', 'Acknowledgment by Legal Manager', 'Acknowledgment by CLO', 'Approval by Direct Line', 'Approval by Related PIC', 'Signing Process', 'Finish'];

export default function HorizontalLinearStepper({ id, status }) {
    const [activeStep, setActiveStep] = React.useState(status.id - 2);
    const alertContext = useAlertContext();
    const [open, setOpen] = useState(false);
    const file = useFile('agreement');

    const formik = useFormik({
        initialValues: {
            file_id: null,
            legal_manager_id: null,
        },
        validationSchema: Yup.object({
            legal_manager_id: Yup
                .number().typeError('Legal Manager is Required')
                .required('Legal Manager is required'),
        }),
        onSubmit: async (data) => {
            try {
                data.go_to_next_status = true;
                const res = await requestUpdate(id, data);

                if (res.success) {
                    setOpen(false);
                    alertContext.setAlert("success", res.message);
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                } else {
                    alertContext.setAlert("error", res.message);
                }
            } catch (err) {
                alertContext.setAlert("error", err.message);
            }
        }
    });

    const handleSubmit = async () => {
        try {
            let data = {};
            console.log(data);
            const fileValidation = file.validateFile();

            if (!fileValidation) {
                alertContext.setAlert("error", 'File is required');
            } else {
                data.file_id = fileValidation;
            }
            data.go_to_next_status = true;
            const res = await requestUpdate(id, data);

            if (res.success) {
                setOpen(false);
                localStorage.removeItem('agreement');
                alertContext.setAlert("success", res.message);
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            } else {
                alertContext.setAlert("error", res.message);
            }

        } catch (err) {
            alertContext.setAlert("error", err.message);
        }
    }

    const handleNext = () => {
        console.log(activeStep, "oke");
        if (activeStep === 1) {
            handleSubmit();
        } else {
            console.log(activeStep);
            setOpen(false);
            setOpen(true);
        }
    };

    const handleBack = async () => {
        try {
            const data = {
                reject_to_review: true
            };
            console.log(data, "reject");
            const res = await requestUpdate(id, data);

            if (res.success) {
                setOpen(false);
                alertContext.setAlert("success", res.message);
                setActiveStep(1);
            } else {
                alertContext.setAlert("error", res.message);
            }
        } catch (err) {
            alertContext.setAlert("error", err.message);
        }



        setActiveStep(1);
    };

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep === 8 ? 9 : activeStep}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Box sx={{ display: 'flex', flexDirection: 'row-reverse', pt: 2 }}>
                            <Button
                                color="primary"
                                variant="contained"
                                disabled={activeStep === 3 || activeStep === 4 || activeStep === 5 || activeStep === 6 || activeStep === 8 || activeStep === 9}
                                onClick={handleNext}
                            >
                                {activeStep === steps.length - 1 ? 'Finish' : 'Approve'}
                            </Button>
                            <Button
                                color="error"
                                variant="contained"
                                disabled={activeStep === 0 || activeStep === 2 || activeStep === 3 || activeStep === 4 || activeStep === 5 || activeStep === 6 || activeStep === 8 || activeStep === 9}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Reject
                            </Button>
                        </Box>
                    </React.Fragment>
                )}
            </Box>

            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <Box sx={style}>
                    {
                        (activeStep === 0 || activeStep === 7) && (
                            <>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Upload Agreement Document
                                </Typography>
                                <FileDropzone file={file} />
                                <Box style={{ textAlign: 'right' }}>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        onClick={handleSubmit}
                                    >
                                        Submit
                                    </Button>
                                </Box>
                            </>
                        )
                    }
                    {
                        activeStep === 2 && (
                            <>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Select a Legal Manager
                                </Typography>
                                <SelectAsync
                                    name='Legal Manager'
                                    formName={'legal_manager_id'}
                                    formik={formik}
                                    data={(search) => getDatasUser('approvers', { search, approver_type: 'manager' })}
                                    user={true}
                                    sx={{
                                        "& .MuiInputBase-input.Mui-disabled": {
                                            WebkitTextFillColor: "black",
                                        },
                                    }}
                                />
                                <Box style={{ textAlign: 'right' }}>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        onClick={formik.submitForm}
                                    >
                                        Submit
                                    </Button>
                                </Box>
                            </>
                        )
                    }
                </Box>
            </Modal>
        </>
    );
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};