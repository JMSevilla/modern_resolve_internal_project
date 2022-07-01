import origlogo from '../../../assets/origlogo.png'
import jmimage from '../../../assets/jm.png'
import bryimage from '../../../assets/bry.png'
import roximage from '../../../assets/rox.png'
import emmanimage from '../../../assets/emman.png'
import {Avatar, Chip} from '@mui/material'
import { red } from '@mui/material/colors'


export const accordionContent = [
    {
        AC_id : 1,
        title : 'About Modern Resolve Organization',
        expanded : true,
        details : [
            {
                detailsId : 1,
                imageDrop : <img 
                    src={origlogo}
                    style={{
                        marginTop: '20px',
                        marginBottom: '20px'
                    }}
                    className='img-fluid'
                    alt='MDR picture'
                />,
                content : 'Modern Resolve Organization is a development team which provide the clients business systems for their businesses'
            }
        ]
    },
    {
        AC_id : 2,
        title : 'About Modern Resolve System Registration',
        details : [
            {
                detailsId : 2,
                imageDrop : <div style={{position : 'relative', overflow: 'hidden', paddingTop: '56.25%'}}><iframe src="https://share.synthesia.io/embeds/videos/b6e14dd4-2cc6-4ea4-9c24-e7c998933807" loading="lazy" title="Synthesia video player - Your AI video" allow="encrypted-media; fullscreen;" style={{position: 'absolute', width: '100%', height: '100%', top: '0',
                left: '0', border: 'none', padding: '0', margin: '0',
                overflow: 'hidden'}}></iframe></div>,
                content : 'Thank you for your interest in joining on our team ! Upon creation of your account on the system, the administrator will notify you if your account is activated.'
            }
        ]
    }
]

export const coreMembers = [
    {
        memberId : 1,
        name : 'Jose Miguel Sevilla',
        avatar : <img src={jmimage} style={{width: '20%', height: 'auto', marginBottom: '20px'}} className='img-fluid' />,
        occupation : 'Software Engineering Lead',
        company : 'MDI Novare Technologies',
        description : 'Fullstack Developer.'
    },
    {
        memberId : 2,
        name : 'Bryan Justin Palad',
        avatar : <img src={bryimage} style={{width: '20%', height: 'auto', marginBottom: '20px'}} className='img-fluid' />,
        occupation : 'Software Engineer',
        company : 'Modern Resolve',
        description : 'Frontend Developer.'
    },
    {
        memberId : 3,
        name : 'Roxanne Albert Luna',
        avatar : <img src={roximage} style={{width: '20%', height: 'auto', marginBottom: '20px'}} className='img-fluid' />,
        occupation : 'Senior Application Analyst',
        company : 'Accenture',
        description : 'Fullstack Developer'
    },
    {
        memberId : 4,
        name : 'Emman Borrico',
        avatar : <img src={emmanimage} style={{width: '20%', height: 'auto', marginBottom: '20px'}} className='img-fluid' />,
        occupation : 'Junior Java Developer',
        company : 'Xurpas',
        description : 'Backend Developer'
    },
    {
        memberId : 5,
        name : 'John Noel Fernandez',
        avatar : <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        J
    </Avatar>,
        occupation : 'Java Developer',
        company : 'Unknown',
        description : 'Frontend Developer'
    }
]

export const reserveMembers = [
    {
        memberId : 1,
        name : 'Benar Isais',
        avatar : <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        B
    </Avatar>,
        occupation : 'None',
        company : 'Unknown',
        description : 'Developer'
    },
    {
        memberId : 2,
        name : 'Cid John Villanueva',
        avatar : <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        C
    </Avatar>,
        occupation : 'None',
        company : 'Unknown',
        description : 'Developer'
    },
    {
        memberId : 3,
        name : 'Aldrin Marasigan Riveral',
        avatar : <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        A
    </Avatar>,
        occupation : 'IT Staff',
        company : 'Fast Logistic',
        description : 'Developer'
    },
    {
        memberId : 4,
        name : 'Ezra Platon Ramirez',
        avatar : <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        E
    </Avatar>,
        occupation : 'None',
        company : 'Unknown',
        description : 'Developer Trainee'
    },
    {
        memberId : 5,
        name : 'Alain Dale Tadifa',
        avatar : <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        A
    </Avatar>,
        occupation : 'None',
        company : 'Unknown',
        description : 'Developer'
    },
    {
        memberId : 6,
        name : 'Kejo Insigne',
        avatar : <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        K
    </Avatar>,
        occupation : 'None',
        company : 'Unknown',
        description : 'Developer'
    }
]

export const steps = ['Personal', 'Team', 'Credentials', 'Done']

export const OccupationType = [
    {
        label : 'Software Quality Engineering Team', value : 'SQE'
    },
    {
        label : 'Quality Assurance Team', value : 'QA'
    },
    {
        label : 'User Experience Design Team' , value : 'UX'
    }
]

export const OccupationPosition = [
    {
        value : 'TRAINEE', label : 'Developer Trainee (FE & BE)'
    },
    {
        value : 'ASE-SUPPORT', label : 'Associate Software Engineer (Support)'
    },
    {
        value : 'SE-FE-REACT', label : 'Software Engineer Frontend (React JS)'
    },
    {
        value : 'SE-FE-VUE', label : 'Software Engineer Frontend (Vue JS)'
    },
    {
        value : 'SE-BE-PHP', label : 'Software Engineer Backend (PHP)'
    },
    {
        value : 'SE-BE-C#', label : 'Software Engineer Backend (C# REST API)'
    },
    {
        value : 'SSE-FS', label : 'Software Engineer Full Stack'
    },
    {
        value : 'DBA-MYSQL',  label : 'Database Administrator (MySQL)'
    },
    {
        value : 'DBA-SQL',  label : 'Database Administrator (MSSQL)'
    },
    {
        value : 'UX',  label : 'UX Designer'
    },
    {
        value : 'QE',  label : 'Quality Engineer'
    }
]

export const DegreeList = [
    {
        value : 'bachelor', label : 'Bachelor'
    },
    {
        value : 'mit', label : 'MIT'
    },
    {
        value : 'dr', label : 'Dr'
    },
]


  
  export const rowCreativeDesign = (rowData) => {
    let arrTemp = rowData
    let newarrTemp = []
    arrTemp.map((item) => {
      newarrTemp.push({
        id : item.id,
        firstname : item.firstname,
        lastname : item.lastname,
        username : item.username,
        password : item.password,
        userType : item.userType,
        isLock : item.isLock
    })
  })
    return newarrTemp
  }