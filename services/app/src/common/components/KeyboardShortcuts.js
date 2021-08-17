import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DialogContent } from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

const KeyboardShortcuts = ({ open, setOpen }) => (
  <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
    <DialogTitle style={{ textAlign: "center" }}>
      <h2 style={{ fontSize: "1.3em", margin: 0 }}>Keyboard Shortcuts</h2>
      <div style={{ fontSize: "0.9" }}>&#8984; + &#8679; + <b>?</b></div>
    </DialogTitle>
    <DialogContent style={{ padding: "10%", paddingTop: 0, textAlign: "center" }}>

      <h3 style={{ paddingTop: 10 }}>General</h3>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 600 }}>Keys</TableCell>
              <TableCell> </TableCell>
              <TableCell style={{ fontWeight: 600 }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>&#8984; + &#8679; + <b>n</b></TableCell>
              <TableCell style={{ color: "#888888" }}>&#x2303; + &#8679; + <b>n</b></TableCell>
              <TableCell>New Deck</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>&#8984; + &#8679; + <b>h</b></TableCell>
              <TableCell> </TableCell>
              <TableCell>Home</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>&#8984; + &#8679; + <b>m</b></TableCell>
              <TableCell> </TableCell>
              <TableCell>Media</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <h3 style={{ paddingTop: 20 }}>Editor</h3>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow >
              <TableCell style={{ fontWeight: 600 }}>Keys</TableCell>
              <TableCell> </TableCell>
              <TableCell style={{ fontWeight: 600 }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>&#8984; + <b>K</b></TableCell>
              <TableCell style={{ color: "#888888" }}>&#x2303; + <b>K</b></TableCell>
              <TableCell>Insert a link</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>&#8984; + <b>&#9166;</b></TableCell>
              <TableCell style={{ color: "#888888" }}>&#x2303; + <b>&#9166;</b></TableCell>
              <TableCell>New Slide</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <h3 style={{ paddingTop: 20 }}>Player</h3>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow >
              <TableCell style={{ fontWeight: 600 }}>Keys</TableCell>
              <TableCell> </TableCell>
              <TableCell style={{ fontWeight: 600 }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell><b>Escape</b></TableCell>
              <TableCell> </TableCell>
              <TableCell>Exit</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </DialogContent>
  </Dialog>
);
export default KeyboardShortcuts;
