//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace AudioPlayer.EntityModel
{
    using System;
    using System.Collections.Generic;
    
    public partial class Log
    {
        public int ID { get; set; }
        public Nullable<System.DateTime> EventTime { get; set; }
        public string CartId { get; set; }
        public string Title { get; set; }
        public string Artist { get; set; }
        public Nullable<System.TimeSpan> Duration { get; set; }
        public string Playlistname { get; set; }
    }
}
