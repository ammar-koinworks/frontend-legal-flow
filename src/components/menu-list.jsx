import { useState } from 'react';
import Router, { useRouter } from 'next/router';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { ChartBar as ChartBarIcon } from '../icons/chart-bar';
import { ExpandLess, ExpandMore, FileCopy, RemoveOutlined, UploadFile } from '@mui/icons-material';
import { useAuthContext } from '../contexts/auth-context';

const itemList = [
  {
    id: 'dashboard',
    href: '/',
    icon: (<ChartBarIcon fontSize="small" />),
    title: 'Dashboard'
  },
  {
    id: 'request',
    href: '/requests',
    icon: (<UploadFile fontSize="small" />),
    title: 'Requests'
  },
  {
    id: 'document',
    href: null,
    icon: (<FileCopy fontSize="small" />),
    title: 'Documents',
    subMenu: [
      {
        id: 'read',
        title: 'List',
        href: '/documents',
      },
      {
        id: 'finish',
        title: 'Approval',
        href: '/documents/approval',
      },
    ],
  }
];

export default function MenuList() {
  const router = useRouter();
  const { roleAccess } = useAuthContext();
  const [nested, setNested] = useState('');

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'transparent' }}
      component="nav"
    >
      {itemList.map((v, i) => {
        const active = router.pathname.includes === v.href;
        const collapse = nested === v.id || v.subMenu?.some(c => router.pathname === c.href);

        if (roleAccess[v.id]?.read) return (
          <div key={i}>
            <ListItemButton
              onClick={() => v.href ? Router.push(v.href) : collapse ? setNested('') : setNested(v.id)}
              selected={active}
              sx={{ backgroundColor: active ? 'rgba(255,255,255, 0.08)' : '' }}
            >
              <ListItemIcon sx={{ color: active ? 'secondary.main' : '' }}>
                {v.icon}
              </ListItemIcon>
              <ListItemText primary={v.title} sx={{ color: active ? 'secondary.main' : '' }} />
              {v.href === null && (collapse ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
            {v.href === null && <Collapse in={collapse} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {v.subMenu.map((sm, smi) => {
                  const subMenuActive = router.pathname === sm.href;
                  if (roleAccess[v.id][sm.id]) return (
                    <ListItemButton
                      sx={{ pl: 4, backgroundColor: subMenuActive ? 'rgba(255,255,255, 0.08)' : '' }}
                      key={smi}
                      onClick={() => Router.push(sm.href)}
                      selected={subMenuActive}
                    >
                      <ListItemIcon sx={{ color: subMenuActive ? 'secondary.main' : '' }}>
                        <RemoveOutlined fontSize='small' />
                      </ListItemIcon>
                      <ListItemText primary={sm.title} sx={{ color: subMenuActive ? 'secondary.main' : '' }} />
                    </ListItemButton>
                  )
                })}
              </List>
            </Collapse>}
          </div>
        )
      })}
    </List>
  )
}
