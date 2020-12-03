using AudioPlayer.EntityModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AudioPlayer.Models.ViewModel
{
    public class AudiolistModel 
    {
        public string CartId { get; set; }

        public string PlaylistName { get; set; }

        public string SongName { get; set; }

        public int? SongId { get; set; }

        public float? SortOrder { get; set; }

        public string FilePath { get; set; }

        public double? FileSize { get; set; }

        public string Filetype  { get; set; }  

        public string Command  { get; set; }

        public TimeSpan? Cmd_Parameter { get; set; }
    }
}