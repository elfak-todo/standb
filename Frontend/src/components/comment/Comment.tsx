import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';

function Comment() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleDelete = () => {};

  return (
    <Card sx={{ mt: 2.5 }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: red[500] }}>AM</Avatar>}
        action={
          <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
            <MoreVertIcon />
          </IconButton>
        }
        title="Andrija Mitić"
        subheader="Januar 14, 2024"
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={handleDelete} sx={{ color: 'red' }}>
          Obriši
        </MenuItem>
      </Menu>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Comment;
